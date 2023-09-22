const { INTEGER, STRING, BOOLEAN, DATE } = require("sequelize");
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
    unique: true,
  },
  details: {
    type: STRING,
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
    completed: this.completed,
  };
};

module.exports = Todo;
