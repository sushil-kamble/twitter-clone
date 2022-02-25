const { Model } = require("objection");

class Tweet extends Model {
  static get tableName() {
    return "tweet";
  }
  static get relationMappings() {
    const User = require("./user");
    const TweetLikes = require("./tweetlikes");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        filter: (query) => query.select("id", "name", "handle", "avatar"),
        join: {
          from: "tweet.userId",
          to: "user.id",
        },
      },
      tweetLikes: {
        relation: Model.HasManyRelation,
        modelClass: TweetLikes,
        filter: (query) => query.select("userId"),
        join: {
          from: "tweet.id",
          to: "tweet_likes.tweetId",
        },
      },
    };
  }
}

module.exports = Tweet;
