module.exports = app => {
  const { router, controller } = app;

  router.get('/api/v1/user', controller.user.getUser);
  router.post('/api/v1/user', controller.user.updateUserInfo);

  router.post('/api/v1/user/login', controller.user.login); // 用户登陆
  router.post('/api/v1/user/register', controller.user.register); // 用户注册
  router.post('/api/v1/user/logout', controller.user.logout); // 用户退出登录
};
