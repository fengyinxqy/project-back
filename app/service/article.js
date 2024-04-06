'use strict';

const Service = require('egg').Service;

class Article extends Service {
  async getArticleList() {
    const { ctx } = this;
    let result = [];
    if (ctx.query.isAll) {
      result = await ctx.model.Article.findAll();
    } else {
      result = await ctx.model.Article.findAll({ where: { isDisplay: 1 } });
    }
    ctx.body = { code: 200, message: '获取文章列表成功', data: result };
    return ctx.body;
  }
  async getArticleById(id) {
    const { ctx } = this;
    const result = await ctx.model.Article.findOne({ where: { articleId: id }, raw: true });
    ctx.body = { code: 200, message: '获取文章成功', data: result };
    return ctx.body;
  }

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

  async deleteArticleById(id) {
    const { ctx } = this;
    const result = await ctx.model.Article.destroy({ where: { articleId: id } });
    if (!result) {
      ctx.throw('删除文章失败', 500);
    }
    ctx.body = { code: 200, message: '删除文章成功', data: result };
    return ctx.body;
  }

  async updateArticleDisplayById(id, isDisplay) {
    const { ctx } = this;
    const result = await ctx.model.Article.update({ isDisplay }, { where: { articleId: id } });
    if (!result) {
      ctx.throw('更新文章显示状态失败', 500);
    }
    ctx.body = { code: 200, message: '更新文章显示状态成功', data: result };
    return ctx.body;
  }
}

module.exports = Article;
