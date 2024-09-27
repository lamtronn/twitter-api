const mysql = require("mysql2");
const config = require("../config");
const { createTable } = require("../utils/sqlFunctions.js");
const followerSchema = require("../models/follower.model.js");
const likeSchema = require("../models/like.model.js");
const replySchema = require("../models/reply.model.js");
const tweetSchema = require("../models/tweet.model.js");
const userSchema = require("../models/user.model.js");


const connectDB = async () => {
  var con = mysql.createConnection(config);
  con.connect((err) => {
    createTables();
    if (err) throw err;
    else console.log("Connected");
  });
};

const createTables = async () => {
  createTable(userSchema);
  createTable(tweetSchema);
  createTable(replySchema);
  createTable(followerSchema);
  createTable(likeSchema);


};

module.exports = connectDB;
