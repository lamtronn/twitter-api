const replySchema = `
    CREATE TABLE IF NOT EXISTS reply (
        reply_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
        tweet_id INT,
        reply TEXT,
        user_id INT,
        date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
        FOREIGN KEY(tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
    )
`;

module.exports = replySchema;


