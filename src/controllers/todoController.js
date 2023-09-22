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

// exports.postUpdateUser = async (req, res) => {
//   logger.info("Update user called...");

//   try {
//     const userId = req.params.userId;
//     const user = await User.findByPk(userId);
//     if (!user) {
//       throw new Error("User may not exist");
//     }

//     await user.update({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//     });

//     await user.save();

//     return res.status(201).send({
//       userId: user.userId,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       updatedAt: user.updatedAt,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send("Error updating user.");
//   }
// };

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
