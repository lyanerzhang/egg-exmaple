const Controller = require('egg').Controller;
const wxConfig = require('../config/wxConfig');
const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';

class UserController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    // 用户注册的参数
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账户密码不能为空',
        data: null,
      };
      return;
    }
    // 校验数据库是否已有该账户
    const userInfo = await ctx.service.user.getUserByName(username);

    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账户名已被注册，请重新输入',
        data: null,
      };
      return;
    }

    const result = await ctx.service.user.register({
      username,
      password,
      signature: '下班下班',
      avatar: defaultAvatar,
    });
    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
      };
    }
  }
  // 登录
  async login() {
    /*
    app: 全局上下文中的一个属性，config/plugin中定义的插件，可以通过app.jwt获取
    config/config.default.js中定义的属性，可以通过app.config.xxx获取，比如app.config.jwt.secret
    */
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const userInfo = await ctx.service.user.getUserByName(username);
    console.log('userinfo', userInfo);
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账户不存在',
        data: null,
      };
      return;
    }
    if (userInfo && userInfo.password !== password) {
      ctx.body = {
        code: 500,
        msg: '账户密码错误，请重新输入',
        data: null,
      };
      return;
    }
    // 生成token
    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);
    ctx.body = {
      code: 200,
      msg: '登录成功',
      data: {
        token,
      },
    };
  }
  async wxLogin() {
    const { ctx } = this;
    const { code } = ctx.request.body;
    const urlStr = 'https://api.weixin.qq.com/sns/jscode2session';
    const data = {
      appid: wxConfig.appid, // 小程序 appId
      secret: wxConfig.appSecret, // 小程序 appSecret
      js_code: code, // 登录时获取的 code
      grant_type: 'authorization_code', // 授权类型，此处只需填写 authorization_code
    };
    const result = await this.ctx.curl(urlStr, {
      data,
      dataType: 'json',
    });
    this.ctx.body = result.data;
    console.log('请求wxlogin', result);
  }
  async test() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization; // token值
    const decode = await app.jwt.verify(token, app.jwt.secret);
    ctx.body = {
      code: 200,
      msg: '获取token成功',
      data: {
        ...decode,
      },
    };
  }
  // 获取用户信息
  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    const userInfo = await ctx.service.user.getUserByName(decode.username);
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || defaultAvatar,
      },
    };
  }
  // 修改用户信息
  async editUserInfo() {
    const { ctx, app } = this;
    try {
      const { signature = '', avatar = '' } = ctx.request.body;
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const user_id = decode.id;
      const userInfo = await ctx.service.user.getUserByName(decode.username);
      // 通过service方法修改用户信息
      const result = await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar,
      });
      console.log(result);
      ctx.body = {
        code: 200,
        msg: '编辑用户成功',
        data: {
          id: user_id,
          signature,
          username: userInfo.username,
          avatar,
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '编辑用户失败',
        data: null,
      };
    }
  }
}

module.exports = UserController;
