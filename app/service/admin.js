'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');
class Admin extends Service {
  async getOverviewInfo() {
    const { ctx } = this;
    try {
      const userCount = await ctx.model.User.count();
      const commentCount = await ctx.model.Comment.count();
      const articleCount = await ctx.model.Article.count();
      ctx.status = 200;
      return { code: 200, message: '获取网站信息成功', data: { userCount, commentCount, articleCount } };
    } catch {
      ctx.status = 500;
      return { code: 500, message: '获取网站信息失败' };
    }
  }

  async getOverviewChart() {
    const { ctx } = this;
    const dates = [ dayjs().format('YYYY-MM-DD') ];
    for (let i = 1; i < 7; i++) {
      const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
      dates.unshift(date);
    }

    const userData = await Promise.all(dates.map(async date => {
      const startOfDay = dayjs(date).startOf('day').toDate();
      const endOfDay = dayjs(date).endOf('day').toDate();
      const count = await ctx.model.User.count({
        where: {
          createdAt: {
            [ctx.model.Sequelize.Op.between]: [ startOfDay, endOfDay ],
          },
        },
      });
      return count;
    }));

    const commentData = await Promise.all(dates.map(async date => {
      const startOfDay = dayjs(date).startOf('day').toDate();
      const endOfDay = dayjs(date).endOf('day').toDate();
      const count = await ctx.model.Comment.count({
        where: {
          createdAt: {
            [ctx.model.Sequelize.Op.between]: [ startOfDay, endOfDay ],
          },
        },
      });
      return count;
    }));

    const articleData = await Promise.all(dates.map(async date => {
      const startOfDay = dayjs(date).startOf('day').toDate();
      const endOfDay = dayjs(date).endOf('day').toDate();
      const count = await ctx.model.Article.count({
        where: {
          createdAt: {
            [ctx.model.Sequelize.Op.between]: [ startOfDay, endOfDay ],
          },
        },
      });
      return count;
    }));
    ctx.status = 200;
    return { code: 200, message: '获取总览数据成功', data: { userData, commentData, articleData, date: dates } };
  }

}

module.exports = Admin;
