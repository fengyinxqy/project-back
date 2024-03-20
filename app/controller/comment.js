// 上传评论
const { Controller } = require('egg');
class CommentController extends Controller {
  async uploadComment() {
    const { ctx } = this;
    const { authorId, authorName, articleId, content } = ctx.request.body;
    ctx.body = await ctx.service.comment.createComment({ authorId, authorName, articleId, content });
  }

  async getComments() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.comment.getCommentsByArticleId(id);
  }
}

module.exports = CommentController;

// exports.uploadComment = async ctx => {
//   const { userId, articleId, content } = ctx.request.body;
//   const comment = await ctx.service.comment.create({ userId, articleId, content });
//   ctx.body = { code: 200, message: '评论成功', data: comment };
// };

// // 获取评论
// exports.getComments = async ctx => {
//   const { articleId } = ctx.query;
//   const comments = await ctx.service.comment.getCommentsByArticleId(articleId);
//   ctx.body = { code: 200, message: '获取评论成功', data: comments };
// };

