const getTweetById = async (req, res) => {
  const { id: userId } = req.body;
  const { tweetId } = req.params;
  try {
    const sql = `SELECT tweet.tweet_id, tweet, tweet.user_id as tweetUserId, tweet.date_time as tweetDateTime, COUNT(*) as replies FROM tweet
                  INNER JOIN reply
                  ON tweet.tweet_id = reply.tweet_id
                  NATURAL JOIN follower
                  WHERE tweet.tweet_id = ${tweetId} AND tweet.user_id = follower.following_user_id AND follower.follower_user_id = ${userId}
                  ORDER BY tweetDateTime DESC`;

    const tweetData = await new Promise((resolve, reject) => {
      return con.query(sql, (error, result) => {
        if (error) return res.status(400).json({ message: error });
        else {
          if (!result[0].tweet_id) {
            return resolve(null);
          } else {
            return resolve(result[0]);
          }
        }
      });
    });

    const likeSql = `SELECT COUNT(*) as likes FROM \`like\`
                        WHERE tweet_id = ${tweetId}`;
    con.query(likeSql, (error, result) => {
      if (error) return res.status(400).json({ message: error });
      else {
        return res.status(200).json({
          data: tweetData ? { ...tweetData, likes: result[0].likes } : null,
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ message: e.error });
  }
};

const getLikeNameByTweetId = async (req, res) => {
  const { tweetId } = req.params;
  try {
    const sql = `SELECT GROUP_CONCAT(name) as likes FROM user
                  INNER JOIN \`like\`
                  ON user.user_id = \`like\`.user_id 
                  WHERE \`like\`.tweet_id = ${tweetId}`;

    con.query(sql, (error, result) => {
      if (error) return res.status(400).json({ message: "Invalid request!" });
      else {
        return res
          .status(200)
          .json({ likes: result[0].likes?.split(",") ?? null });
      }
    });
  } catch (e) {
    return res.status(400).json({ message: e.error });
  }
};

module.exports = {
  getTweetById,
  getLikeNameByTweetId,
};
