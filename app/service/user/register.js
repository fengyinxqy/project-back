'use strict';

const Service = require('egg').Service;
// const JSEncrypt = require('node-jsencrypt');
const bcrypt = require('bcryptjs');

class LoginService extends Service {
  // 检查用户名
  async register() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;

    // // 根据用户名查询用户信息
    const User = app.model.User;
    const user = await User.findOne({
      where: {
        username,
      },
      attributes: [ 'id', 'username', 'password' ],
    });
    if (user) {
      ctx.status = 400;
      ctx.body = { message: '用户名已存在' };
      return ctx.body;
    }
    // // 加密存储
    const salt = bcrypt.genSaltSync(10);
    const hash_password = bcrypt.hashSync(password, salt);
    try {
      const res = await User.create({
        username, password: hash_password,
      });
      ctx.logger.info(res);
      ctx.body = { message: '注册成功' };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { message: '注册失败' };
    }
    return ctx.body;

  }
}

module.exports = LoginService;
