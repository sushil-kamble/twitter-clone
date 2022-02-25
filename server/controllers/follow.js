const Follow = require("../db/models/follow");

const followUser = async (req, res) => {
  const currentUser = res.locals.user;
  const { id } = req.params;
  try {
    const follow = await Follow.query().insert({
      from: currentUser.uid,
      to: id,
    });
    return res.status(201).json(follow);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const unFollowUser = async (req, res) => {
  const currentUser = res.locals.user;
  const { id } = req.params;
  try {
    const follow = await Follow.query().delete().where({
      from: currentUser.uid,
      to: id,
    });
    return res.status(201).json(follow);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  followUser,
  unFollowUser,
};
