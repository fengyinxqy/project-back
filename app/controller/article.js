// app/controller/user.js

// const bcrypt = require('bcryptjs');
const { Controller } = require('egg');
class ArticleController extends Controller {
  async uploadArticle() {
    const { ctx } = this;
    const { title, content, authorId, authorName } = ctx.request.body;
    ctx.body = await ctx.service.article.uploadArticle(title, content, authorId, authorName);
  }

  async getArticleList() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.getArticleList();
  }

  async getArticleById() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.article.getArticleById(id);
  }

  async deleteArticleById() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.article.deleteArticleById(id);
  }

  async updateArticleDisplayById() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { isDisplay } = ctx.request.body;
    ctx.body = await ctx.service.article.updateArticleDisplayById(id, isDisplay);
  }
}

module.exports = ArticleController;
