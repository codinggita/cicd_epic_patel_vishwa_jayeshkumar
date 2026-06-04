const jwt = require('jsonwebtoken');
const config = require('../config'); // adjust path if needed

// Generate a JWT for a user
function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const secret = process.env.JWT_SECRET || 'your_jwt_secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
  return jwt.sign(payload, secret, { expiresIn });
}

// Verify a JWT and return the decoded payload
function verifyToken(token) {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret';
  return jwt.verify(token, secret);
}

module.exports = { generateToken, verifyToken };
