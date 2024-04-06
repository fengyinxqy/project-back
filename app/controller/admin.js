const { Controller } = require('egg');
class AdminController extends Controller {
  // 获取管理后台总览信息
  async getOverview() {
    const { ctx } = this;
    ctx.body = await ctx.service.admin.getOverviewInfo();
  }

  async getOverviewChart() {
    const { ctx } = this;
    ctx.body = await ctx.service.admin.getOverviewChart();
  }
}

module.exports = AdminController;
