const express = require("express");
const { getTweetById } = require("../controllers/user.controller");
const { isAuthorized } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/api/tweets/:tweetId/", isAuthorized, getTweetById);

module.exports = router;
