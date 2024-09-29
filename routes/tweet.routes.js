const express = require("express");
const { getTweetById, getLikeNameByTweetId } = require("../controllers/user.controller");
const { isAuthorized } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/api/tweets/:tweetId/", isAuthorized, getTweetById);
router.get("/api/tweets/:tweetId/likes", isAuthorized, getLikeNameByTweetId);

module.exports = router;
