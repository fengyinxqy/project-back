'use strict';

// 有效时间为30分钟
exports.getToken = function(options) {
  return this.app.jwt.sign(options, this.app.config.jwt.secret, { expiresIn: '1800s' });
};
