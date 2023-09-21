const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/new", userController.postCreateUser);

module.exports = router;
