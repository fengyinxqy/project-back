// app/controller/avatar.js
const fs = require('fs');
const path = require('path');

const Controller = require('egg').Controller;

class AvatarController extends Controller {
  async upload() {


    const { ctx } = this;
    // const userId = this.ctx.request.body.userId;
    const file = ctx.request.files[0];

    // 生成路径名
    const toFileName = '/public/upload/' + Date.now() + file.filename;
    const to = path.dirname(__dirname) + toFileName;

    // 拷贝图片至本地
    await fs.copyFileSync(file.filepath, to);

    // 返回前端路径
    const newUrl = 'http://127.0.0.1:7001' + toFileName;

    ctx.body = {
      msg: '图片上传成功',
      url: newUrl,
    };
  }
}

module.exports = AvatarController;
