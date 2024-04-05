const { INTEGER, STRING, BOOLEAN, DATE, TEXT } = require("sequelize");
const sequelize = require("../databases/sequelize");

const Todo = sequelize.define("todo", {
  todoId: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  details: {
    type: TEXT,
    allowNull: false,
  },

  deadline: {
    type: DATE,
    allowNull: false,
  },

  completed: {
    type: BOOLEAN,
    allowNull: false,
  },
});

Todo.prototype.format = function () {
  return {
    todoId: this.todoId,
    userId: this.userId,
    title: this.title,
    details: this.details,
    deadline: this.deadline,
    completed: this.completed,
  };
};

module.exports = Todo;
