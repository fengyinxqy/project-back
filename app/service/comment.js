'use strict';

const Service = require('egg').Service;

class Comment extends Service {

  async createComment({ authorId, authorName, articleId, content }) {
    const { ctx } = this;
    try {
      const comment = await ctx.model.Comment.create({ authorId, authorName, articleId, content });
      ctx.logger.info(comment);
      ctx.status = 200;
      const uploadComment = await this.getOneComment(comment.dataValues.commentId);
      return { code: 200, message: '评论成功', data: uploadComment };
    } catch (error) {
      ctx.status = 500;
      return { code: 500, message: '评论失败' };
    }
  }

  async getCommentsByArticleId(articleId) {
    const { ctx } = this;
    try {
      const comments = await ctx.model.Comment.findAll({ where: { articleId }, raw: true });
      const count = comments.length;
      ctx.logger.info(comments);
      return { code: 200, message: '获取评论成功', data: { count, comments } };
    } catch (error) {
      ctx.status = 500;
      return { code: 500, message: '获取评论失败' };
    }
  }

  async getOneComment(commentId) {
    const { ctx } = this;
    try {
      const comment = await ctx.model.Comment.findOne({ where: { commentId }, raw: true });
      ctx.logger.info(comment);
      return comment;
    } catch (error) {
      ctx.status = 500;
      return { code: 500, message: '获取评论失败' };
    }
  }

}

module.exports = Comment;
