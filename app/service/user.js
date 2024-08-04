'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
// const dayjs = require('dayjs');
class User extends Service {
  async getAllUser() {
    const { ctx } = this;
    const user = await ctx.model.User.findAll({ attributes: { exclude: ['password'] } });
    if (!user) {
      ctx.status = 400;
      ctx.body = { code: 400, message: '获取用户信息失败' };
      return ctx.body;
    }
    ctx.status = 200;
    return {
      code: 0,
      message: '用户信息查询成功',
      data: user,
    };
  }
  async getUserInfo() {
    const { ctx } = this;
    const { username } = ctx.request.query;
    const user = await ctx.model.User.findOne({
      where: { username },
      attributes: { exclude: ['password', 'role'] }, // 排除 password 字段
      raw: true,
    });
    if (!user) {
      ctx.status = 401;
      ctx.body = { message: '用户名不存在' };
      return;
    }
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: '用户信息查询成功',
      user,
    };
    return ctx.body;
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    // 根据用户名查询用户信息
    const user = await ctx.model.User.findOne({ where: { username }, raw: true });
    if (!user) {
      ctx.status = 401;
      ctx.body = { code: 401, message: '用户名不存在' };
      return;
    }
    // 验证密码
    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      ctx.status = 400;
      ctx.body = { code: 400, message: '密码不正确' };
      return ctx.body;
    }
    // 签发 Token
    const token = app.jwt.sign({ userId: user.id }, app.config.jwt.secret, { expiresIn: '1d' });
    const filteredUserInfo = { ...user };
    delete filteredUserInfo.password;
    ctx.status = 200;
    ctx.body = { code: 200, message: '登陆成功，正在跳转', data: { userInfo: filteredUserInfo } };
    ctx.cookies.set('token', token, {
      httpOnly: false, // 仅允许服务器读取 Cookie
      signed: true, // 对 Cookie 进行签名
      maxAge: 24 * 60 * 60 * 1000, // 过期时间为一天
    });
    ctx.session.userId = user.id;
    return ctx.body;
  }

  async logout() {
    // 用户登出
    const { ctx } = this;
    const username = ctx.request.body.username;
    const user = await ctx.model.User.findOne({ where: { username } });
    if (user) {
      // 清空登录session信息
      ctx.session.userId = null;
      ctx.cookies.set('token', null);
      return ctx.body;
    }
    ctx.status = 400;
    ctx.body = {
      code: 0,
      message: '登出失败！',
    };
    return ctx.body;
  }

  async register() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;

    // 根据用户名查询用户信息
    const User = app.model.User;
    const user = await User.findOne({
      where: {
        username,
      },
      attributes: ['id', 'username', 'password'],
    });
    if (user) {
      ctx.status = 400;
      ctx.body = { message: '用户名已存在' };
      return ctx.body;
    }
    // 加密存储
    const salt = bcrypt.genSaltSync(10);
    const hash_password = bcrypt.hashSync(password, salt);
    try {
      const res = await User.create({
        username,
        password: hash_password,
      });
      ctx.logger.info(res);
      ctx.body = { code: 200, message: '注册成功，正在跳转至登录页' };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { message: '注册失败' };
    }
    return ctx.body;
  }

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
        const file = ctx.request.files[0];
        const uploadDir = path.join(__dirname, '..', 'public', 'upload');

        // 检查目录是否存在，不存在则创建
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // 生成唯一文件名
        const fileName = Date.now() + '_' + file.filename;
        const to = path.join(uploadDir, fileName);

        const reader = fs.createReadStream(file.filepath);
        const writer = fs.createWriteStream(to);

        // 处理错误
        reader.on('error', err => {
          console.error('读取文件出错:', err);
        });
        writer.on('error', err => {
          console.error('写入文件出错:', err);
        });

        reader.pipe(writer);

        const newUrl = 'http://127.0.0.1:7001/public/upload/' + fileName;

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

  async getUserById(id) {
    const { ctx } = this;
    const result = await ctx.model.User.findOne({ where: { id }, raw: true });
    if (!result) {
      ctx.throw('获取用户失败', 500);
    }
    ctx.body = { code: 200, message: '获取用户成功', data: result };
    return ctx.body;
  }

  async deleteUserById(id) {
    const { ctx } = this;
    const result = await ctx.model.User.destroy({ where: { id } });
    if (!result) {
      ctx.throw('删除用户失败', 500);
    }
    ctx.body = { code: 200, message: '删除用户成功', data: result };
    return ctx.body;
  }

  async updateUserRole(id, role) {
    const { ctx } = this;
    const result = await ctx.model.User.update({ role }, { where: { id } });
    if (!result) {
      ctx.throw('更新用户角色失败', 500);
    }
    ctx.body = { code: 200, message: '更新用户角色成功', data: result };
    return ctx.body;
  }
}

module.exports = User;
