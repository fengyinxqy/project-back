module.exports = app => {
  const { router, controller } = app;
  router.get('/api/v1/admin/overview', controller.admin.getOverview);
  router.get('/api/v1/admin/overview-chart', controller.admin.getOverviewChart);
};
