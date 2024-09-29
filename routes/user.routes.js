const express = require("express");
const {
  getUserFeed,
  getFollowing,
  getFollowers,
  getAllTweets,
  createTweet,
  deleteTweet
} = require("../controllers/user.controller");
const { isAuthorized } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/api/user/tweets/feed", isAuthorized, getUserFeed);
router.get("/api/user/following", isAuthorized, getFollowing);
router.get("/api/user/followers", isAuthorized, getFollowers);
router.get("/api/user/tweets", isAuthorized, getAllTweets);
router.post("/api/user/tweets", isAuthorized, createTweet);
router.delete("/api/user/tweets/:tweetId", isAuthorized, deleteTweet);


module.exports = router;
