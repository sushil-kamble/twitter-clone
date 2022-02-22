const { Model } = require("objection");

class TweetLikes extends Model {
  static get tableName() {
    return "tweetlikes";
  }
}

module.exports = TweetLikes;
