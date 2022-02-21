const express = require("express");
const tweetController = require("../controllers/tweet");

const router = express.Router();

// Requires auth middleware

// Post Tweet
router.post("/");
// Get Tweet by Id
router.get("/:id", tweetController.getTweetById);
// Delete Tweet by Id
router.delete("/:id");
// Update Tweet (inc / dec likes etc)
router.put("/:id");

module.exports = router;
