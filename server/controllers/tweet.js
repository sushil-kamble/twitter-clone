const Tweet = require("../db/models/tweet");
const User = require("../db/models/user");
const TweetLikes = require("../db/models/tweetlikes");

const postTweet = async (req, res) => {
  const { content } = req.body;
  const currentUser = res.locals.user;
  try {
    const tweet = await Tweet.query()
      .insert({
        content,
        userId: currentUser.uid,
      })
      .select("id", "content", "userId", "created_at")
      .withGraphFetched("user")
      .withGraphFetched("tweetLikes");
    tweet.tweetLikes = [];
    tweet.isLiked = false;
    return res.status(201).json(tweet);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAllTweets = async (req, res) => {
  const currentUser = res.locals.user;
  const data = await User.query()
    .findById(currentUser.uid)
    .select("id")
    .withGraphFetched("following");
  const following = data.following.map((x) => x.to);
  try {
    const tweets = await Tweet.query()
      .whereIn("userId", following)
      .orWhere("userId", currentUser.uid)
      .select("id", "content", "userId", "created_at")
      .withGraphFetched("user")
      .withGraphFetched("tweetLikes");
    const tweetsdata = tweets.map((tweet) => {
      tweet.tweetLikes = tweet.tweetLikes.map((x) => x.userId);
      if (tweet.tweetLikes.includes(currentUser.uid)) {
        tweet.isLiked = true;
      } else {
        tweet.isLiked = false;
      }
      return tweet;
    });
    return res.status(200).json(tweetsdata);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const toggleLikeTweet = async (req, res) => {
  const { id } = req.params; // id of tweet
  const currentUser = res.locals.user;
  try {
    // Check if tweet is liked
    const likeTweet = await TweetLikes.query().findOne({
      tweetId: id,
      userId: currentUser.uid,
    });
    if (likeTweet) {
      await TweetLikes.query().deleteById(likeTweet.id);
      return res.status(200).json({ message: "Tweet Unliked" });
    } else {
      await TweetLikes.query().insert({
        userId: currentUser.uid,
        tweetId: id,
      });
      return res.status(200).json({ message: "Tweet Liked" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  postTweet,
  toggleLikeTweet,
  getAllTweets,
};
