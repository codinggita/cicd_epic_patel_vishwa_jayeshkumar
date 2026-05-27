const mongoose = require("mongoose");
const { PREFERENCES_DEFAULTS, THEME_OPTIONS, LANGUAGE_OPTIONS } = require("../constants/preferences.constants");

/**
 * Preferences Schema
 *
 * Represents user application preferences in the database.
 * Tracks user customization settings for the application.
 */
const preferencesSchema = new mongoose.Schema(
  {
    // Reference to the user who owns these preferences
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // User's preferred theme (light, dark, or system)
    theme: {
      type: String,
      enum: Object.values(THEME_OPTIONS),
      default: PREFERENCES_DEFAULTS.THEME,
    },

    // User's preferred timezone
    timezone: {
      type: String,
      default: PREFERENCES_DEFAULTS.TIMEZONE,
    },

    // Email notification preference
    emailNotifications: {
      type: Boolean,
      default: PREFERENCES_DEFAULTS.EMAIL_NOTIFICATIONS,
    },

    // User's preferred language
    language: {
      type: String,
      enum: Object.values(LANGUAGE_OPTIONS),
      default: PREFERENCES_DEFAULTS.LANGUAGE,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Preferences = mongoose.model("Preferences", preferencesSchema);

module.exports = Preferences;
