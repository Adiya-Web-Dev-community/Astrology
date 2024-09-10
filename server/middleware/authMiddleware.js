// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config/config");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log("1");
  // console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized to access this route" });
  }
  try {
    console.log(token);

    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    console.log(req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized to access this route" });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "User role is not authorized to access this route",
      });
    }
    next();
  };
};
