const { Model } = require("objection");

class Tweet extends Model {
  static get tableName() {
    return "tweet";
  }
  static get relationMappings() {
    const User = require("./user");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        filter: (query) => query.select("id", "handle", "avatar"),
        join: {
          from: "tweet.userId",
          to: "user.id",
        },
      },
    };
  }
}

module.exports = Tweet;
