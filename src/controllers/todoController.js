const Todo = require("../models/todo");
const User = require("../models/user");
const logger = require("../utils/logger");

exports.postCreateTodo = async (req, res, next) => {
  logger.info("Create new todo called...");
  // console.log("RequestBody: ", req.body);

  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const similarTodo = await user.getTodos({
      where: { title: req.body.title },
    });

    // console.log("SimilarTodo: ", similarTodo);
    if (similarTodo.length > 0) {
      throw new Error("Todo may already exist");
    }
    await user.createTodo({ ...req.body, completed: false });

    const todos = await user.getTodos();
    const formatedTodos = todos.map((todo) => todo.format());
    return res.status(200).send({
      success: true,
      body: { total: formatedTodos.length, data: formatedTodos },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ success: false, body: "Error creating todo." });
  }
};

exports.patchUpdateTodo = async (req, res) => {
  logger.info("Update todo called...");

  try {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const todoList = await user.getTodos({
      where: { todoId },
    });

    const todo = todoList[0];

    if (!todo) {
      throw new Error("Todo may not exist");
    }
    await todo.update({ ...todo, ...req.body });
    console.log(todo.prototype);

    const todos = await user.getTodos();
    const formatedTodos = todos.map((todo) => todo.format());
    return res.status(200).send({
      success: true,
      body: { total: formatedTodos.length, data: formatedTodos },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ success: false, body: "Error updating todo." });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);
    if (!user) throw new Error();

    const todos = await user.getTodos();
    // console.log("Todos: ", todos);

    const formatedTodos = todos.map((todo) => todo.format());

    return res.status(200).send({
      success: true,
      body: { total: formatedTodos.length, data: formatedTodos },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ success: false, body: "Failed to get all todos." });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    console.log(userId, todoId);
    const user = await User.findByPk(userId);
    const todo = await user.getTodos({ where: { todoId } });
    // console.log(todo);
    await todo[0].destroy();
    const todos = await user.getTodos();
    const formatedTodos = todos.map((todo) => todo.format());
    return res.status(200).send({
      success: true,
      body: { total: formatedTodos.length, data: formatedTodos },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, body: "An error occured" });
  }
};

exports.getCompleteTodo = async (req, res) => {
  logger.info("Complete todo called........................");
  try {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const todoList = await user.getTodos({
      where: { todoId },
    });

    const todo = todoList[0];

    if (!todo) {
      throw new Error("Todo may not exist");
    }
    const updatedTodo = await todo.update({
      ...todo,
      completed: req.body.completed,
    });
    console.log("Updated todo: ", req.body);
    const todos = await user.getTodos();
    console.log("success");
    const formatedTodos = todos.map((todo) => todo.format());
    return res.status(200).send({
      success: true,
      body: { total: formatedTodos.length, data: formatedTodos },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, body: "Failed to update todo" });
  }
};
