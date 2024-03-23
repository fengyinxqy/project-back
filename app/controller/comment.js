// 上传评论
const { Controller } = require('egg');
class CommentController extends Controller {
  async uploadComment() {
    const { ctx } = this;
    const { authorId, authorName, articleId, content, parentCommentId, replayCommentId } = ctx.request.body;
    ctx.body = await ctx.service.comment.createComment({ authorId, authorName, articleId, content, parentCommentId, replayCommentId });
  }

  async getComments() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.comment.getCommentsByArticleId(id);
  }

  async likeComment() {
    const { ctx } = this;
    const { commentId } = ctx.request.body;
    ctx.body = await ctx.service.comment.likeComment(commentId);
  }
}

module.exports = CommentController;
