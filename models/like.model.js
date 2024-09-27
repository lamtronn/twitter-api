const likeSchema = `
    CREATE TABLE IF NOT EXISTS \`like\` (
        like_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        tweet_id INT,
        user_id INT,
        date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
        FOREIGN KEY(tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
    )
`;

module.exports = likeSchema;


