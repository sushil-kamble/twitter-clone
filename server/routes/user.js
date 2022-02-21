const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// Login User
router.post("/login");
// Register User
router.post("/register");

// Requires auth
// Get user details by id
router.get("/:id", userController.getUserById);
// Update user details by id
router.put("/:id");

module.exports = router;
