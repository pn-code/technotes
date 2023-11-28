const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");

router.route("/").post(loginLimiter, authController.login);

router.route("/refresh").get(loginLimiter, authController.refresh);

router.route("/logout").post(loginLimiter, authController.logout);

module.exports = router;
