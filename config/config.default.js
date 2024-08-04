/* eslint valid-jsdoc: "off" */

'use strict';
const fs = require('fs');
const path = require('path');


module.exports = () => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.keys = '6x6q6y';

  // add your middleware config here
  config.middleware = ['error', 'jwtAuth'];
  config.jwtAuth = {
    ignore: [
      '/api/v1/user/login',
      '/api/v1/user/register',
      '/api/v1/user/logout', '/',
      '/swagger-ui.html',
    ],
  };
  // jwt
  config.jwt = {
    secret: '6x6q6y',
    sign: {
      expiresIn: 8 * (60 * 60),
    },
  };
  config.multipart = {
    mode: 'file',
  };
  // 密码加密
  config.bcrypt = {
    saltRounds: 10,
  };

  config.private_key = fs.readFileSync(path.resolve(__dirname, '../key/private.key'), 'utf8');

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '626488xqy',
    database: 'blog',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 地址 ->  config/config.default.js
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径
    // 接口文档的标题，描述或其它
    apiInfo: {
      title: '接口文档', // 接口文档的标题
      description: 'swagger 测试接口文档', // 接口文档描述
      version: '1.0.0', // 接口文档版本
    },
    schemes: ['http', 'https'], // 配置支持的协议
    // consumes: [ 'application/json' ], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
    // produces: [ 'application/json' ], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
    securityDefinitions: { // 配置接口安全授权方式
    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）
    // enableValidate: true,    // 是否启用参数校验，默认 true（启用）
    routerMap: true, // 是否启用自动生成路由，默认 true (启用)
    enable: true, // 默认 true (启用)
  };

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['http://127.0.0.1'],
  };
  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.session = {
    // 设置session cookie里面的key
    key: 'SESSION_ID',
    // 设置最大的过期时间
    maxAge: 8 * 1000 * 60,
    // 设置是否只服务端可以访问
    httpOnly: true,
    // 设置是否加密
    encrypt: true,
  };

  // config.websocket = {
  //   redis: {
  //     host: '127.0.0.1',
  //     port: 6379,
  //     password: '626488',
  //   },
  // };

  return {
    ...config,
    ...userConfig,
  };
};
