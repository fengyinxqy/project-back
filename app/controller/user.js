// app/controller/user.js

// const bcrypt = require('bcryptjs');
const { Controller } = require('egg');
class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = await this.service.user.login();
  }
  // 注册
  async register() {
    const { ctx } = this;
    ctx.body = await this.service.user.register();
  }
  async logout() {
    const { ctx } = this;
    ctx.body = await this.service.user.logout();
  }
  async getUser() {
    const { ctx } = this;
    ctx.body = await this.service.user.getUserInfo();
  }
  async getAllUser() {
    const { ctx } = this;
    ctx.body = await this.service.user.getAllUser();
  }
  async updateUserInfo() {
    const { ctx } = this;
    const { username, oldPassword, newPassword } = ctx.request.body;
    ctx.body = await ctx.service.user.updateUserInfo(username, oldPassword, newPassword);
  }

  async getUserById() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.getUserById(id);
  }

  async deleteUserById() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.deleteUserById(id);
  }

  async updateUserRole() {
    const { ctx } = this;
    const { id, role } = ctx.request.body;
    ctx.body = await ctx.service.user.updateUserRole(id, role);
  }
}

module.exports = UserController;
