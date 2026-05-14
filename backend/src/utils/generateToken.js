const jwt = require("jsonwebtoken");

/**
 * Generates a signed JWT token for the given user ID.
 * @param {string} userId - The MongoDB _id of the user
 * @returns {string} - Signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

module.exports = generateToken;
