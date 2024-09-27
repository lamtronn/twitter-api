const { generateAccessToken } = require("../utils/jwtFunctions");
const { checkExistingRecords, insertRecord } = require("../utils/sqlFunctions");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { username, password, name, gender } = req.body;

  try {
    const isExisting = await checkExistingRecords("user", "username", username);
    if (isExisting) {
      return res.status(400).json({ message: "User already exists!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password is too short!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      username,
      password: hashedPassword,
      name,
      gender,
    };

    await insertRecord("user", user);
    return res.status(200).json({ message: "User created successfully!" });
  } catch (e) {
    return res.status(400).json({ message: e.error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await checkExistingRecords(
      "user",
      "username",
      username
    );
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credential!" });
    }
    const isMatchingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isMatchingPassword) {
      return res.status(400).json({ message: "Invalid credential!" });
    }
    return res
      .status(200)
      .json({ jwt: generateAccessToken(existingUser.user_id) });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e });
  }
};

module.exports = { register, login };
