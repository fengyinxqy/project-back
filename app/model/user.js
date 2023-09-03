'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
      comment: '用户名，唯一',
    },
    password: STRING,
  }, {
    timestamps: false, // 关闭自动生成的 createdAt 和 updatedAt 字段
  });

  return User;
};
