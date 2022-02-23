const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "user";
  }
  static get relationMappings() {
    const Tweet = require("./tweet");
    const Follow = require("./follow");

    return {
      following: {
        relation: Model.HasManyRelation,
        modelClass: Follow,
        join: {
          from: "user.id",
          to: "follow.from",
        },
      },
      followers: {
        relation: Model.HasManyRelation,
        modelClass: Follow,
        filter: (query) => query.select("from"),
        join: {
          from: "user.id",
          to: "follow.to",
        },
      },
      tweet: {
        relation: Model.HasManyRelation,
        modelClass: Tweet,
        join: {
          from: "user.id",
          to: "tweet.userId",
        },
      },
    };
  }
}

module.exports = User;
