const Tweet = require("../db/models/tweet");
const User = require("../db/models/user");

const postTweet = async (req, res) => {
  const { content } = req.body;
  const currentUser = res.locals.user;
  try {
    const tweet = await Tweet.query()
      .insert({
        content,
        userId: currentUser.uid,
      })
      .withGraphFetched("user");
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
      .withGraphFetched("user");
    return res.status(200).json(tweets);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAllTweetsById = async (req, res) => {
  const { id } = req.params;
  try {
    const tweets = await Tweet.query()
      .withGraphFetched("user")
      .where({ userId: id });
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
  getAllTweetsById,
  getAllTweets,
  getTweetById,
};
