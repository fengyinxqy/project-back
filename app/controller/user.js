// app/controller/user.js

// const bcrypt = require('bcryptjs');
const { Controller } = require('egg');
class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = await this.service.user.login.login();
  }
  // 注册
  async register() {
    const { ctx } = this;
    ctx.body = await this.service.user.register.register();
  }
  async logout() {
    const { ctx } = this;
    ctx.body = await this.service.user.logout.logout();
  }
}

module.exports = UserController;
