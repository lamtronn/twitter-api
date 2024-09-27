const express = require("express");
const {
  register,
  login,
//   logout,
//   changePassword,
//   requestResetPassword,
} = require("../controllers/auth.controller");
// const isAuthorized = require("../middlewares/token.middleware");
const router = express.Router();

router.post("/api/register", register);
router.post("/api/login", login);
// router.post("/api/logout", isAuthorized, logout);
// router.post("/api/change-password", isAuthorized, changePassword);
// router.post("/api/forgot-password", isAuthorized, requestResetPassword);

module.exports = router;
