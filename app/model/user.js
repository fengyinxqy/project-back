'use strict';

module.exports = app => {
  const { UUID, STRING, ENUM } = require('sequelize');

  const User = app.model.define('users', {
    id: {
      type: UUID,
      defaultValue: app.Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: 'username',
      comment: '用户名，唯一',
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    avatar: {
      type: STRING,
      defaultValue: 'http://127.0.0.1:7001/public/upload/default-avatar.jpg',
      comment: '头像链接',
    },
    role: {
      type: ENUM,
      values: ['admin', 'user'],
      defaultValue: 'user'
    },
  });

  return User;
};
