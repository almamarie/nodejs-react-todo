const express = require("express");
const todoController = require("../controllers/todoController");
const { requireAuth } = require("../utils/auth");
const router = express.Router();

router.post("/:userId/new", requireAuth, todoController.postCreateTodo);
router.patch(
  "/:userId/:todoId/update",
  requireAuth,
  todoController.patchUpdateTodo
);
router.get("/:userId", requireAuth, todoController.getTodos);
router.delete("/:userId/:todoId", requireAuth, todoController.deleteTodo);
router.patch("/:todoId/complete", requireAuth, todoController.getCompleteTodo);

module.exports = router;
