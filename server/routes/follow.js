const express = require("express");
const followController = require("../controllers/follow");
const auth = require("../middlewares/auth");

const router = express.Router();

// Get all everything from follow table
router.get("/", followController.getAllFollow);

router.get("/:id", followController.getFollowersById);

//  Follow User
router.post("/:id", auth, followController.followUser);

// Unfollow User
router.delete("/:id", auth, followController.unFollowUser);

module.exports = router;
