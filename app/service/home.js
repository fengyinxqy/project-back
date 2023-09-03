'use strict';
const { Service } = require('egg'); // 拿到 egg 对象的Service基类
class HomeService extends Service {
  async test() {
    const result = await this.app.mysql.query('select * from test', '');
    return JSON.stringify({
      code: 1,
      message: 'success',
      data: result,
    });
  }
}

module.exports = HomeService;
