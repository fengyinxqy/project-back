module.exports = app => {
  const { router, controller } = app;
  router.get('/api/v1/website-info', controller.website.getWebsiteInfo);
};
