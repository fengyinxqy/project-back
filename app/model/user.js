'use strict';

module.exports = app => {
  const { DataTypes } = require('sequelize');
  // 请确保 Sequelize 库被正确引入，并且从中获取 DataTypes 对象

  const User = app.model.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '用户名，唯一',
    },
    password: DataTypes.STRING,
    avatar: {
      type: DataTypes.STRING,
      defaultValue: '',
      comment: '头像链接',
    },
  }, {
    timestamps: false, // 关闭自动生成的 createdAt 和 updatedAt 字段
    indexes: [
      // 创建唯一索引
      {
        unique: true,
        fields: [ 'username' ],
      },
    ],
  });

  return User;
};
