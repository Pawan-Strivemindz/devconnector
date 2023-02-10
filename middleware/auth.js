const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get Token from header
  const token = req.header("Authorization");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "authrorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
