'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // middleware
  // 重定向到swagger
  router.redirect('/', '/swagger-ui.html', 302);
  // 接口路由
  router.get('/api/v1/user', controller.user.getUser);
  router.post('/api/v1/user', controller.user.updateUserInfo);
  router.post('/api/v1/user/login', controller.user.login); // 用户登陆
  router.post('/api/v1/user/register', controller.user.register); // 用户注册
  router.post('/api/v1/user/logout', controller.user.logout); // 用户退出登录
  router.post('/api/v1/avatar/upload', controller.avatar.upload);

  router.get('/api/v1/article', controller.article.getArticleList);
  router.get('/api/v1/article/:id', controller.article.getArticleById);
  router.post('/api/v1/article', controller.article.uploadArticle);
  // 上传评论接口
  router.post('/api/v1/comment', controller.comment.uploadComment);
  // 获取评论接口
  router.get('/api/v1/comment/:id', controller.comment.getComments);
  // 评论点赞
  router.post('/api/v1/comment/like', controller.comment.likeComment);

  // 启动之前创建数据表
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    await app.model.sync({
      // 为true时删除原表创建新表
      // 为false时不删除原有表，只创建不存在的
      force: false,
      alter: true,
    });
  });
};
