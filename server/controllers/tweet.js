const Tweet = require("../db/models/tweet");

const postTweet = async (req, res) => {
  const { content } = req.body;
  const currentUser = res.locals.user;
  try {
    const tweet = await Tweet.query().insert({
      content,
      userId: currentUser.uid,
    });
    return res.status(201).json(tweet);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.query();
    return res.status(200).json(tweets);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getTweetById = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.query().findById(id);
    return res.status(200).json(tweet);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  postTweet,
  getAllTweets,
  getTweetById,
};
