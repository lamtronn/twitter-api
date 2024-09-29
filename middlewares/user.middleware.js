const mysql = require("mysql2");
const config = require("../config");
const con = mysql.createConnection(config);

const isFollowing = async (req, res, next) => {
  const { tweetId } = req.params;
  const { userId } = req.headers;
  const sql = `SELECT * FROM tweet
                INNER JOIN follower
                ON tweet.user_id = follower.following_user_id
                WHERE follower.follower_user_id = ${userId} AND tweet.tweet_id = ${tweetId}`;
  con.query(sql, (error, result) => {
    if (error) return res.status(400).json({ message: "Cannot" });
    if (!result[0]) {
      return res.status(400).json({ message: "Cannot" });
    } else {
      next();
    }
  });
};

module.exports = { isFollowing };
