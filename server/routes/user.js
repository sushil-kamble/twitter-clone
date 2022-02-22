const express = require("express");
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router();

// Login User
router.post("/login", userController.login);
// Register User
router.post("/register", userController.register);

// Get user details by id
router.get("/:id", userController.getUserProfileDataById);

// Get tweets by Id
router.get("/:id/tweets", auth, userController.getTweetsByUserId);

// Update user details by id
router.put("/:id");

module.exports = router;
