const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

/**
 * Registers a new user.
 * - Checks for duplicate email
 * - Hashes the password before saving
 * - Returns the saved user document
 */
const registerUser = async ({ name, email, password }) => {
  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already in use");
    error.statusCode = 409;
    throw error;
  }

  // 2. Hash the password (salt rounds = 10 is the industry standard)
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Save the user with the hashed password
  const user = await User.create({ name, email, password: hashedPassword });

  return user;
};

/**
 * Logs in an existing user.
 * - Finds user by email
 * - Compares the provided password with the hashed one
 * - Generates and returns a JWT token
 */
const loginUser = async ({ email, password }) => {
  // 1. Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // 2. Compare the plain-text password with the stored hashed password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // 3. Generate a JWT token for the authenticated user
  const token = generateToken(user._id);

  return { user, token };
};

module.exports = { registerUser, loginUser };
