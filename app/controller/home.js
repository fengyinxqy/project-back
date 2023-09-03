'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {

  async test() {
    const { ctx } = this;
    ctx.body = await this.service.home.test();
  }
}

module.exports = HomeController;
