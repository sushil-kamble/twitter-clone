const express = require("express");
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router();

// Login User
router.post("/login", userController.login);

// Register User
router.post("/register", userController.register);

// Get Current User Meta Data
router.get("/meta", auth, userController.getCurrenttUserMetaData);

// Get all users with follow details
router.get("/", auth, userController.getAllUser);

module.exports = router;
