'use strict';

module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE } = app.Sequelize;
  const Article = app.model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(100),
    content: TEXT,
    author: STRING(50),
    createdAt: { type: DATE, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
  });

  return Article;
};
