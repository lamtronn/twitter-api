const jwt = require("jsonwebtoken");

const isAuthorized = async (req, res, next) => {
  let jwtToken;
  const { id: userId } = req.body;
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (!jwtToken) {
    return res.status(401).json({ message: "Invalid token!" });
  } else {
    jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, payload) => {
      if (userId && userId !== payload.userId) {
        return res.status(401).json({ message: "Invalid token!" });
      }
      if (error) {
        return res.status(401).json({ message: "Invalid token!" });
      } else {
        req.headers.userId = payload.userId;
        next();
      }
    });
  }
};

module.exports = { isAuthorized };
