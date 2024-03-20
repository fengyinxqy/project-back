'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Comment = app.model.define('comment', {
    commentId: { type: INTEGER, primaryKey: true, autoIncrement: true },
    content: STRING(100),
    authorId: INTEGER,
    authorName: STRING(50),
    articleId: INTEGER,
    createdAt: { type: DATE, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
  });
  return Comment;
};
