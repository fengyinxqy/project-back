'use strict';

const Service = require('egg').Service;

class GetArticleList extends Service {
  async getArticleList() {
    const { ctx } = this;
    const result = await ctx.model.Article.findAll();
    ctx.logger.info(result);
    ctx.body = { code: 200, message: '获取文章列表成功', data: result };
    return ctx.body;
  }
  async getArticleById(id) {
    const { ctx } = this;
    const result = await ctx.model.Article.findOne({ where: { articleId: id }, raw: true });
    ctx.logger.info(result);
    ctx.body = { code: 200, message: '获取文章成功', data: result };
    return ctx.body;
  }
}

module.exports = GetArticleList;
