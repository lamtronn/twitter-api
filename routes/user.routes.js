const express = require("express");
const {
    getUserFeed,
    getFollowing,
    getFollowers
} = require("../controllers/user.controller");
const { isAuthorized } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/api/user/tweets/feed", isAuthorized, getUserFeed);
router.get("/api/user/following", isAuthorized, getFollowing);
router.get("/api/user/followers", isAuthorized, getFollowers);

module.exports = router;
