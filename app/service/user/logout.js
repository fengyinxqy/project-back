'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async logout() {
    // 用户登出
    const { ctx } = this;
    const username = ctx.request.body.username;
    const user = await ctx.model.User.findOne({ where: { username } });
    if (user) {
      // 清空登录session信息
      ctx.session.userId = null;
      ctx.cookies.set('token', null);
      return ctx.body;
    }
    ctx.status = 400;
    ctx.body = {
      code: 0,
      message: '登出失败！',
    };
    return ctx.body;
  }
}

module.exports = LoginService;
