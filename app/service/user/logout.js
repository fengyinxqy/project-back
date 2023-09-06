'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  // 检查用户名
  async logout() {
    const { ctx } = this;
    const username = ctx.request.body.username;
    const user = await ctx.model.User.findOne({ where: { username } });
    if (user) {
      // 清空登录session信息
      ctx.status = 200;
      ctx.body = {
        code: 0,
        message: '登出成功！',
      };
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
