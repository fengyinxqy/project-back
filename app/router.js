'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router } = app;

  // middleware
  // 重定向到swagger
  router.redirect('/', '/swagger-ui.html', 302);
  // 接口路由
  require('./router/home')(app);
  require('./router/user')(app);
  require('./router/article')(app);
  require('./router/comment')(app);
  require('./router/admin')(app);

  // 配置 WebSocket 全局中间件
  app.ws.use(async (ctx, next) => {
    console.log('websocket open');
    await next();
    console.log('websocket closed');
  });
  // app/router.js
  // 配置路由中间件
  app.ws.route('/ws/join', app.controller.websocket.join);

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
