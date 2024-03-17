'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

class EditUserInfo extends Service {
  // 检查用户名
  async updateUserInfo(username, oldPassword, newPassword) {
    const { ctx } = this;
    try {
      const user = await ctx.model.User.findOne({ where: { username }, raw: true });
      if (!user) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '用户不存在' };
        return ctx.body;
      }
      if (oldPassword && newPassword) {
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
          ctx.status = 400;
          ctx.body = { code: 400, message: '旧密码不正确' };
          return ctx.body;
        }

        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(newPassword, salt);

        const res = await ctx.model.User.update(
          { password: hash_password },
          { where: { username } }
        );
        ctx.logger.info(res);
      }

      if (ctx.request.files.length) {
        // 保存头像文件到服务器或云存储
        const file = ctx.request.files[0];
        const toFileName = '/public/upload/' + Date.now() + file.filename;
        const to = path.dirname(path.dirname(__dirname)) + toFileName;

        // 拷贝图片至本地
        await fs.copyFileSync(file.filepath, to);

        // 返回前端路径
        const newUrl = 'http://127.0.0.1:7001' + toFileName;


        const res = await ctx.model.User.update(
          { avatar: newUrl },
          { where: { username } }
        );
        ctx.logger.info(res);
      }
      ctx.body = { code: 200, message: '修改成功' };
      return ctx.body;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { code: 500, message: '服务器错误' };
      return ctx.body;
    }
  }
}

module.exports = EditUserInfo;
