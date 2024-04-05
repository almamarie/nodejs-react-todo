const express = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../utils/auth");
const router = express.Router();

router.post("/signin", authController.signIn);
router.get("/verify-auth", requireAuth, authController.verifyAuth);

module.exports = router;
