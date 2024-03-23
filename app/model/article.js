'use strict';

module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE } = app.Sequelize;
  const Article = app.model.define('article', {
    articleId: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(100),
    content: TEXT,
    authorId: INTEGER,
    authorName: STRING(50),
    article_like: { type: INTEGER, defaultValue: 0 },
    createdAt: { type: DATE, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
  });

  return Article;
};
