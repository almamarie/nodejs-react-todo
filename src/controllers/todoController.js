const Todo = require("../models/todo");
const User = require("../models/user");
const logger = require("../utils/logger");

exports.postCreateTodo = async (req, res, next) => {
  logger.info("Create new todo called...");

  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    const response = await user.createTodo({ ...req.body });

    return res.status(201).send(response);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error creating todo.");
  }
};

exports.postUpdateTodo = async (req, res) => {
  logger.info("Update todo called...");

  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      throw new Error("Todo may not exist");
    }

    const response = await todo.update({ ...todo, ...req.body });

    // console.log("response: ", response);
    // await user.save();

    return res.status(201).send(todo.format());
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error updating todo.");
  }
};

exports.getTodos = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);
    if (!user) throw new Error();

    // console.log(user.__proto__);

    const todos = await user.getTodos();
    console.log("Todos: ", todos);
    const formatedTodos = todos.map((todo) => todo.format());
    return res.status(200).send(formatedTodos);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Failed to get all todos.");
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);
    const todo = await user.getTodos({ where: { todoId: req.body.todoId } });
    console.log(todo);
    await todo[0].destroy();
    const todos = await user.getTodos();
    const formatedTodos = todos.map((todo) => todo.format());
    return res.status(200).send(formatedTodos);
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occured");
  }
};

exports.getCompleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;

    const todo = await Todo.findByPk(todoId);
    if (!todo) throw new Error("Todo not found");
    todo.update({ ...todo.format(), completed: req.body.completed });

    return res.status(200).send({ ...todo.format() });
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to update todo");
  }
};
