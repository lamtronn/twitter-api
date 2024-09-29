const express = require("express");
const {
  getTweetById,
  getLikeNameByTweetId,
} = require("../controllers/tweet.controller");
const { isAuthorized } = require("../middlewares/auth.middleware");
const { isFollowing } = require("../middlewares/user.middleware");
const router = express.Router();

router.get("/api/tweets/:tweetId/", isAuthorized, isFollowing, getTweetById);
router.get(
  "/api/tweets/:tweetId/likes",
  isAuthorized,
  isFollowing,
  getLikeNameByTweetId
);
module.exports = router;
