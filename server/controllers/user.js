const User = require("../db/models/user");
// const Follow = require("../db/models/follow");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Tweet = require("../db/models/tweet");

const login = async (req, res) => {
  try {
    // Get user input
    const { handle, password } = req.body;

    // Validate user input
    if (!(handle && password)) {
      return res
        .status(400)
        .json({ message: "Handle & Password are required" });
    }

    // Find user by handle
    const user = await User.query().findOne({ handle });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ uid: user.id, handle }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      // save user token
      user.token = token;
      // delete password from user
      delete user.password;
      // return new user
      return res.status(200).json(user);
    }
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.name });
  }
};

const register = async (req, res) => {
  try {
    const { handle, password, confirmPassword, name = "", bio = "" } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.query().insert({
      name,
      bio,
      handle,
      password: encryptedPassword,
    });
    // Create token
    const token = jwt.sign({ uid: user.id, handle }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    // save user token
    user.token = token;
    // delete password from user
    delete user.password;
    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.name });
  }
};

const getCurrenttUserMetaData = async (req, res) => {
  try {
    const currentUser = res.locals.user;
    const user = await User.query()
      .findById(currentUser.uid)
      .select("id", "name", "handle", "avatar", "bio");
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.name });
  }
};

const getAllUser = async (req, res) => {
  try {
    const currentUser = res.locals.user;
    const data = await User.query()
      .select("id", "name", "bio", "handle", "avatar")
      .withGraphFetched("[followers, following]");
    const usersdata = data.map((user) => {
      user.followers = user.followers.map((x) => x.from);
      user.following = user.following.map((x) => x.to);
      if (user.followers.includes(currentUser.uid)) {
        user.isFollowing = true;
      } else {
        user.isFollowing = false;
      }
      return user;
    });
    return res.status(200).json(usersdata);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.name });
  }
};

const getUserProfileDataByHandle = async (req, res) => {
  try {
    const { handle } = req.params;
    const user = await User.query()
      .findOne({ handle })
      .select("id", "handle", "avatar", "bio");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.name });
  }
};

const getTweetsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const tweets = await Tweet.query().where("userId", id);
    if (tweets.length === 0) {
      return res.status(404).json({ message: "Tweets not found" });
    }
    return res.status(200).json(tweets);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.name });
  }
};

module.exports = {
  login,
  register,
  getCurrenttUserMetaData,
  getAllUser,
  getUserProfileDataByHandle,
  getTweetsByUserId,
};
