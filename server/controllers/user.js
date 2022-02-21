const User = require("../db/models/user");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.query().findById(id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getUserById,
};
