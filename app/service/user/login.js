'use strict';

const Service = require('egg').Service;
// const JSEncrypt = require('node-jsencrypt');
const bcrypt = require('bcryptjs');

class LoginService extends Service {
  // 检查用户名
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    console.log(username, password);

    // // 根据用户名查询用户信息
    const user = await ctx.model.User.findOne({ username });
    console.log(user);
    if (!user) {
      ctx.status = 401;
      ctx.body = { message: '用户名不存在' };
      return;
    }
    // // 验证密码
    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      ctx.status = 401;
      ctx.body = { message: '密码不正确' };
      return;
    }
    // 签发 Token
    const token = app.jwt.sign({ userId: user.id }, app.config.jwt.secret, { expiresIn: '1d' });
    ctx.session.user = {
      username,
    };
    ctx.body = { message: '登陆成功', token };
    ctx.cookies.set('token', token, {
      httpOnly: true, // 仅允许服务器读取 Cookie
      signed: true, // 对 Cookie 进行签名
      maxAge: 24 * 60 * 60 * 1000, // 过期时间为一天
    });
    return ctx.body;
  }
}

module.exports = LoginService;
