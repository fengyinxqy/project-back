'use strict';

const Service = require('egg').Service;

class UploadArticle extends Service {
  async uploadArticle(title, content, author) {
    const { ctx } = this;
    try {
      const result = await this.ctx.model.Article.create({ title, content, author });
      ctx.logger.info(result);
      ctx.body = { code: 200, message: '创建文章成功' };
      return ctx.body;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { code: 500, message: '创建文章失败' };
      return ctx.body;
    }
  }
}

module.exports = UploadArticle;
