const userSchema = `
    CREATE TABLE IF NOT EXISTS user (
            user_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name TEXT,
            username TEXT,
            password TEXT,
            gender TEXT
    )
`;

module.exports = userSchema;


