const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;
const UserModel = require("../models/users");
const admin = async (req, res, next) => {
  const token = req.headers["x-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    const user = await UserModel.findById(decoded.user_id);
    if (!user) {
      return res.status(401).send("Invalid Token");
    }
    req.user = user;
    if (!req.user.isAdmin) {
      return res.status(403).send("You do not have admin privileges");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = admin;
