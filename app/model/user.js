'use strict';

module.exports = app => {
  const { DataTypes } = require('sequelize');
  // 请确保 Sequelize 库被正确引入，并且从中获取 DataTypes 对象

  const User = app.model.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'username',
      comment: '用户名，唯一',
    },
    password: DataTypes.STRING,
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'http://127.0.0.1:7001/public/upload/default-avatar.jpg',
      comment: '头像链接',
    },
    role: { type: DataTypes.INTEGER, defaultValue: 0 },
  });

  return User;
};
