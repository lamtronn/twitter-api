const mysql = require("mysql2");
const config = require("../config");
const { getRecords, insertRecord, deleteRecord } = require("../utils/sqlFunctions");

const con = mysql.createConnection(config);

const getUserFeed = async (req, res) => {
  const { id: userId } = req.body;
  try {
    const sql = `SELECT user_id, username, tweet_id, tweet, date_time as dateTime FROM follower
                INNER JOIN tweet
                ON tweet.user_id = follower.following_user_id
                NATURAL JOIN user 
                WHERE follower.follower_user_id = ${userId}
                ORDER BY dateTime DESC
                LIMIT 4`;
    con.query(sql, (error, result) => {
      if (error) return res.status(400).json({ message: error });
      else {
        return res.status(200).json({ data: result });
      }
    });
  } catch (e) {
    return res.status(400).json({ message: e.error });
  }
};

const getFollowing = async (req, res) => {
  const { id: userId } = req.body;
  try {
    const sql = `SELECT user_id, name , username FROM follower
                INNER JOIN user 
                ON follower.following_user_id = user.user_id
                WHERE follower.follower_user_id = ${userId};`;
    con.query(sql, (error, result) => {
      if (error) return res.status(400).json({ message: error });
      else {
        return res.status(200).json({ data: result });
      }
    });
  } catch (e) {
    return res.status(400).json({ message: e.error });
  }
};

const getFollowers = async (req, res) => {
  const { id: userId } = req.body;
  try {
    const sql = `SELECT user_id, name , username FROM follower
                INNER JOIN user 
                ON follower.follower_user_id = user.user_id
                WHERE follower.following_user_id = ${userId};`;
    con.query(sql, (error, result) => {
      if (error) return res.status(400).json({ message: error });
      else {
        return res.status(200).json({ data: result });
      }
    });
  } catch (e) {
    return res.status(400).json({ message: e.error });
  }
};

const getAllTweets = async (req, res) => {
  const { userId } = req.headers;
  try {
    const results = await getRecords("tweet", "user_id", userId);
    return res.status(200).json({ data: results });
  } catch (e) {
    return res.status(400).json({ message: "Invalid request!" });
  }
};

const createTweet = async (req, res) => {
  const { tweet } = req.body;
  const { userId } = req.headers;
  try {
    const payload = {
      tweet,
      user_id: userId,
    };
    await insertRecord("tweet", payload);
    return res.status(200).json({ message: "Tweet created successfully!" });
  } catch (e) {
    return res.status(400).json({ message: "Invalid request!" });
  }
};

const deleteTweet = async (req, res) => {
  const { tweetId } = req.params;
  const { userId } = req.headers;
  try {
    const payload = {
      tweet_id: tweetId,
      user_id: userId
    };
    await deleteRecord("tweet", payload);
    return res.status(200).json({ message: "Tweet deleted successfully!" });
  } catch (e) {
    return res.status(400).json({ message: "Invalid request!" });
  }
};

module.exports = {
  getUserFeed,
  getFollowing,
  getFollowers,
  getAllTweets,
  createTweet,
  deleteTweet
};
