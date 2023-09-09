'use strict';

const Service = require('egg').Service;

class GetUserInfo extends Service {
  // 检查用户名
  async getUserInfo() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    const user = await ctx.model.User.findOne({
      where: { id },
      attributes: { exclude: [ 'password' ] }, // 排除 password 字段
    });
    console.log(user.dataValues);
    if (!user) {
      ctx.status = 401;
      ctx.body = { message: '用户名不存在' };
      return;
    }
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: '用户信息查询成功',
      user,
    };
    return ctx.body;
  }
}

module.exports = GetUserInfo;
