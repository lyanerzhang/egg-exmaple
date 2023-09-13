'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const { id } = ctx.query;
    // ctx.body = id;

    // ctx.render 默认会去view文件夹寻找 index.html 文件，并将title传入index.html
    await ctx.render('index.html', {
      title: `我是神，id：${ctx.query.id}`,
    });
  }
  // 获取用户信息
  async user() {
    const { ctx } = this;
    const result = await ctx.service.home.user();
    ctx.body = result;
  }
  // 添加用户信息
  async addUser() {
    const { ctx } = this;
    const { username, password, signature } = ctx.request.body;
    try {
      await ctx.service.home.addUser(username, password, signature);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null,
      };
    }
  }
  async editUser() {
    const { ctx } = this;
    const { id, username, password, signature } = ctx.request.body;
    try {
      await ctx.service.home.editUser(id, username, password, signature);
      ctx.body = {
        code: 200,
        msg: '编辑成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '编辑失败',
        data: null,
      };
    }
  }
  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = ctx.service.home.deleteUser(id);
      console.log(result);
      ctx.body = {
        code: 200,
        msg: '删除成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '删除失败',
        data: null,
      };
    }
  }
}

module.exports = HomeController;
