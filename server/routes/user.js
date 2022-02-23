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

// Get user details by handle
router.get("/:handle", userController.getUserProfileDataByHandle);

// Get tweets by Id
router.get("/:id/tweets", auth, userController.getTweetsByUserId);

// Update user details by id
router.put("/:id");

module.exports = router;
