module.exports = app => {
  const { router, controller } = app;
  router.get('/api/v1/article', controller.article.getArticleList);
  router.get('/api/v1/article/:id', controller.article.getArticleById);
  router.post('/api/v1/article', controller.article.uploadArticle);
  router.delete('/api/v1/article/:id', controller.article.deleteArticleById);
  // 写一个修改文章的路由
  router.put('/api/v1/article/display/:id', controller.article.updateArticleDisplayById);
};
