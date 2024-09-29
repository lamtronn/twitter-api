const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./database/database");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const tweetRoutes = require("./routes/tweet.routes");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", tweetRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
