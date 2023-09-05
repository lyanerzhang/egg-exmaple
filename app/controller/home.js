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
    const { name, slogen } = await ctx.service.home.user();
    ctx.body = {
      name,
      slogen,
    };
  }
  // 添加用户信息
  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    ctx.body = {
      title,
    };
  }
}

module.exports = HomeController;
