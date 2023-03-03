const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

const admin = (req, res, next) => {
  const token = req.headers["x-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
    if (!req.user.isAdmin) {
      // check if user is not an admin
      return res.status(403).send("You do not have admin privileges");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = admin;
