require("dotenv").config();

const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(user.toJSON(), process.env.TOKEN_SECRET);
};

const authenticateRequest = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const cookieToken = req.cookies?.access_token;
  const token = authHeader
    ? authHeader && authHeader.split(" ")[1]
    : cookieToken;

  if (token === null) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) {
      console.log(error);
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    return next();
  });
};

const validateToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const cookieToken = req.cookies?.access_token;
  const token = authHeader
    ? authHeader && authHeader.split(" ")[1]
    : cookieToken;

  if (token === null) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) {
      console.log(error);
      return res.status(403).json({ message: "Forbidden" });
    }
    return res.json(user);
  });
};

module.exports = { generateAccessToken, authenticateRequest, validateToken };
