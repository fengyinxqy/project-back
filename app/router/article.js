module.exports = app => {
  const { router, controller } = app;
  router.get('/api/v1/article', controller.article.getArticleList);
  router.get('/api/v1/article/:id', controller.article.getArticleById);
  router.post('/api/v1/article', controller.article.uploadArticle);
};
