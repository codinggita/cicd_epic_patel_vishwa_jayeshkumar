const mongoose = require("mongoose");

/**
 * Settings Schema
 *
 * Represents user settings in the database.
 * Settings allow users to customize their application experience.
 */
const settingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    theme: {
      type: String,
      default: "light",
      trim: true,
    },

    notificationsEnabled: {
      type: Boolean,
      default: true,
    },

    language: {
      type: String,
      default: "en",
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
