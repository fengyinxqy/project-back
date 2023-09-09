const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function jwtAuth(ctx, next) {
    // 获取请求头中的 Token
    let token = ctx.header.authorization || '';

    if (!token) {
      ctx.status = 401;
      ctx.body = { message: '未提供有效的 Token' };
      return;
    }

    token = token.split(' ')[1];

    try {
      // 验证并解码 Token
      const decoded = jwt.verify(token, ctx.app.config.jwt.secret);
      ctx.status = 200;
      ctx.body = { token };
      // 将解码后的用户信息存放到 ctx 中，方便后续处理
      ctx.user = decoded;
      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = { message: 'Token 不合法或已过期' };
    }
  };
};
