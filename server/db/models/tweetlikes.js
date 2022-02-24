const { Model } = require("objection");

class TweetLikes extends Model {
  static get tableName() {
    return "tweet_likes";
  }
}

module.exports = TweetLikes;
