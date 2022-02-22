const Follow = require("../db/models/follow");

const getAllFollow = async (req, res) => {
  try {
    const follow = await Follow.query();
    res.status(200).json(follow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

const getFollowersById = async (req, res) => {
  try {
    const { id } = req.params;
    const follow = await Follow.query().findById(id);
    return res.status(200).json(follow);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllFollow,
  followUser,
  getFollowersById,
  unFollowUser,
};
