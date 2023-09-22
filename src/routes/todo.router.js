const express = require("express");
const todoController = require("../controllers/todoController");
const { requireAuth } = require("../utils/auth");
const router = express.Router();

router.post("/:userId/new", requireAuth, todoController.postCreateTodo);
router.patch("/:todoId/update", requireAuth, todoController.postUpdateTodo);
router.get("/:userId", requireAuth, todoController.getTodos);
router.delete("/:userId", requireAuth, todoController.deleteTodo);

module.exports = router;
