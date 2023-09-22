const Todo = require("../models/todo");
const logger = require("../utils/logger");

exports.postCreateTodo = async (req, res, next) => {
  logger.info("Create new todo called...");

  try {
    const identicalTodos = await Todo.findAll({
      where: { title: req.body.title },
    });

    console.log("Identical todos: ", identicalTodos);
    if (identicalTodos.length > 1) throw new Error("Todo may already exists");

    console.log(req.body);
    const response = await Todo.create({ ...req.body });

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

// exports.getUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const user = await User.findByPk(userId);

//     if (!user) throw new Error();

//     return res.status(200).send({
//       userId: user.userId,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//     });
//   } catch (error) {
//     return res.status(400).send("User not found.");
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findByPk(userId);
//     if (!user) throw new Error();
//     await user.destroy();
//     return res.status(200).send("User deleted.");
//   } catch (error) {
//     res.status(400).send("An error occured");
//   }
// };
