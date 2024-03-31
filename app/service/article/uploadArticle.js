'use strict';

const Service = require('egg').Service;

class UploadArticle extends Service {
  async uploadArticle(title, content, authorId, authorName) {
    const { ctx } = this;
    try {
      const { articleId } = await this.ctx.model.Article.create({ title, content, authorId, authorName, raw: true });
      ctx.body = { code: 200, message: '创建文章成功', data: { articleId } };
      return ctx.body;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { code: 500, message: '创建文章失败' };
      return ctx.body;
    }
  }
}

module.exports = UploadArticle;
