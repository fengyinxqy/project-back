module.exports = app => {
  const { router, controller } = app;

  // 上传评论接口
  router.post('/api/v1/comment', controller.comment.uploadComment);
  // 获取评论接口
  router.get('/api/v1/comment/:id', controller.comment.getComments);
  // 评论点赞
  router.post('/api/v1/comment/like', controller.comment.likeComment);
};
