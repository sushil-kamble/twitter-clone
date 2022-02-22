const { Model } = require("objection");

class Follow extends Model {
  static get tableName() {
    return "follow";
  }
}

module.exports = Follow;
