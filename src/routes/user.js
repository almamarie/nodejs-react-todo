const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/new", userController.postCreateUser);
router.post("/:userId/update", userController.postUpdateUser);

module.exports = router;
