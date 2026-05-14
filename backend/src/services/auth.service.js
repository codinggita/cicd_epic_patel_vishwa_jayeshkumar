const User = require("../models/user.model");

// TODO: Hash password using bcryptjs before saving
// TODO: Generate JWT token after successful registration/login

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already in use");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // TODO: Compare hashed password using bcryptjs
  // TODO: Return signed JWT token

  return user;
};

module.exports = { registerUser, loginUser };
