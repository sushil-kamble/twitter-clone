const Tweet = require("../db/models/tweet");

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
  getTweetById,
};
