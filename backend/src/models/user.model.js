const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // Password will be hashed using bcryptjs before saving
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Profile fields — optional, added by PATCH /users/me
    bio: {
      type:    String,
      trim:    true,
      default: "",
      maxlength: 300,
    },

    avatar: {
      type:    String,
      trim:    true,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
