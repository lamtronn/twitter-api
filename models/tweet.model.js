const tweetSchema = `
    CREATE TABLE IF NOT EXISTS tweet (
        tweet_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
        tweet TEXT,
        user_id	INT,
        date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
    )
`;

module.exports = tweetSchema;


