// app/controller/user.js

// const bcrypt = require('bcryptjs');
const { Controller } = require('egg');
class WebsiteController extends Controller {
  async getWebsiteInfo() {
    const { ctx } = this;
    ctx.body = await this.service.website.getWebsiteInfo();
  }
}

module.exports = WebsiteController;
