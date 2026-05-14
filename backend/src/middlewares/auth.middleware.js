const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const HTTP_STATUS = require("../constants/httpStatus");

/**
 * Middleware to protect routes by verifying the JWT token.
 * Expects: Authorization: Bearer <token>
 */
const protect = async (req, res, next) => {
  try {
    // 1. Check if Authorization header exists and starts with "Bearer"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // 2. Extract the token from the header
    const token = authHeader.split(" ")[1];

    // 3. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find the user from the decoded token payload
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // 5. Attach user to the request object for downstream use
    req.user = user;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = { protect };
