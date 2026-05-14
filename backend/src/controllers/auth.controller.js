const { registerUser, loginUser } = require("../services/auth.service");
const HTTP_STATUS = require("../constants/httpStatus");

/**
 * POST /api/v1/auth/register
 * Registers a new user and returns their basic info.
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser({ name, email, password });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/auth/login
 * Logs in a user and returns a JWT token.
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/auth/profile
 * Returns the profile of the currently logged-in user.
 * This route is protected — req.user is set by auth.middleware.js
 */
const getProfile = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Profile fetched successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile };
