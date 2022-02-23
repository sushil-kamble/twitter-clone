const express = require("express");
const tweetController = require("../controllers/tweet");
const auth = require("../middlewares/auth");

const router = express.Router();

// Post Tweet
router.post("/", auth, tweetController.postTweet);
// Get all tweets
router.get("/", tweetController.getAllTweets);
// Get all tweets by user id
router.get("/all/:id", tweetController.getAllTweetsById);

// Get Tweet by Id
router.get("/:id", tweetController.getTweetById);
// Delete Tweet by Id
router.delete("/:id");
// Update Tweet (inc / dec likes etc)
router.put("/:id");

module.exports = router;
