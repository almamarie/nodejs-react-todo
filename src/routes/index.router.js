const express = require("express");
const UserRouter = require("./user.router");
const AuthRouter = require("./auth.router");
const TodoRouter = require("./todo.router");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ success: true, body: "Root router reached" });
});

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/todo", TodoRouter);

exports.IndexRouter = router;
