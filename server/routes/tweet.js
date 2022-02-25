const express = require("express");
const tweetController = require("../controllers/tweet");
const auth = require("../middlewares/auth");

const router = express.Router();

// Post Tweet - Requires Authentication
router.post("/", auth, tweetController.postTweet);

// Get all tweets where user is following - Requires Authentication
router.get("/", auth, tweetController.getAllTweets);

// Toggle Like on tweet - Requires Authentication
router.post("/like/:id", auth, tweetController.toggleLikeTweet);

module.exports = router;
