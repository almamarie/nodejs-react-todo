const express = require("express");
const UserRouter = require("./user");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Root router reached");
});

router.use("/user", UserRouter);

exports.IndexRouter = router;
