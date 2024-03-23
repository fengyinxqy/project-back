'use strict';

const Service = require('egg').Service;

class Comment extends Service {

  async createComment({ authorId, authorName, articleId, content, parentCommentId, replayCommentId }) {
    const { ctx } = this;
    try {
      const params = { authorId, authorName, articleId, content };
      if (parentCommentId) params.parentCommentId = parentCommentId;
      if (replayCommentId) params.replayCommentId = replayCommentId;
      const comment = await ctx.model.Comment.create(params);
      ctx.logger.info(comment);
      ctx.status = 200;
      const uploadComment = await this.getCommentsByArticleId(comment.dataValues.articleId);
      return { code: 200, message: '评论成功', data: uploadComment };
    } catch (error) {
      ctx.status = 500;
      return { code: 500, message: '评论失败' };
    }
  }

  async getCommentsByArticleId(articleId) {
    const { ctx } = this;
    try {
      const comments = await ctx.model.Comment.findAll({ where: { articleId, parentCommentId: null }, raw: true });
      const count = comments.length;
      await Promise.all(comments.map(async comment => {
        comment.isOpen = false;
        const subComments = await this.getAllSubComment(comment.commentId);
        subComments.map(item => {
          item.isOpen = false;
          return item;
        });
        comment.subComments = subComments;
        return comment;
      }));
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

  async getAllSubComment(commentId) {
    const { ctx } = this;
    try {
      const subComments = await ctx.model.Comment.findAll({ where: { parentCommentId: commentId }, raw: true });
      ctx.logger.info(subComments);
      return subComments;
    } catch (error) {
      ctx.status = 500;
      return { code: 500, message: '获取评论失败' };
    }
  }

  async likeComment(commentId) {
    const { ctx } = this;
    try {
      // 给commentId的评论点赞
      const comment = await ctx.model.Comment.findOne({ where: { commentId } });
      if (!comment) {
        ctx.status = 404;
        return { code: 404, message: '评论不存在' };
      }
      comment.like += 1;
      await comment.save();
      ctx.status = 200;
      return { code: 200, message: '点赞成功' };
    } catch (err) {
      ctx.status = 500;
      return { code: 500, message: '点赞' };
    }
  }

}

module.exports = Comment;
