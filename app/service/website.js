'use strict';

const Service = require('egg').Service;

class Website extends Service {

  async getWebsiteInfo() {
    const { ctx } = this;
    try {
      const userCount = await ctx.model.User.count();
      console.log(userCount);
      const articleCount = await ctx.model.Article.count();
      console.log(articleCount);
      const lastDayUserCount = await ctx.model.User.count({
        where: {
          createdAt: {
            [ctx.model.Sequelize.Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });
      const lastDayArticleCount = await ctx.model.Article.count({
        where: {
          createdAt: {
            [ctx.model.Sequelize.Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });
      ctx.status = 200;
      return {
        code: 200,
        message: '获取网站信息成功',
        data: {
          userCount,
          articleCount,
          lastDayUserCount,
          lastDayArticleCount,
        },
      };
    } catch (error) {
      ctx.status = 500;
      return { code: 500, message: '获取网站信息失败' };
    }
  }
}

module.exports = Website;
