const { registerUser, loginUser } = require("../services/auth.service");
const HTTP_STATUS = require("../config/constants");
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