// app/controller/user.js

// const bcrypt = require('bcryptjs');
const { Controller } = require('egg');
class ArticleController extends Controller {
  async uploadArticle() {
    const { ctx } = this;
    const { title, content, author } = ctx.request.body;
    ctx.body = await ctx.service.article.uploadArticle.uploadArticle(title, content, author);
  }

  async getArticleList() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.getArticleList.getArticleList();
  }
}

module.exports = ArticleController;
