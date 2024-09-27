const followerSchema = `
    CREATE TABLE IF NOT EXISTS follower (
        follower_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
        follower_user_id INT,
        following_user_id	INT,
        FOREIGN KEY(follower_user_id) REFERENCES user(user_id) ON DELETE CASCADE,
        FOREIGN KEY(following_user_id) REFERENCES user(user_id) ON DELETE CASCADE
    )
`;

module.exports = followerSchema;


