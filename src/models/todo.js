const { INTEGER, STRING, BOOLEAN, DATE, NOW } = require("sequelize");
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

module.exports = Todo;
