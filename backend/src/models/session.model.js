const mongoose = require("mongoose");
const {
  SESSION_STATUS,
  SESSION_DEFAULTS,
} = require("../constants/session.constants");

/**
 * Session Schema
 *
 * Represents a user session in the database.
 * Tracks active user sessions across devices for security and management.
 */
const sessionSchema = new mongoose.Schema(
  {
    // Reference to the user who owns this session
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Device information (e.g., "Chrome on Windows", "Safari on iPhone")
    device: {
      type: String,
      trim: true,
      default: SESSION_DEFAULTS.DEVICE,
    },

    // IP address of the session
    ipAddress: {
      type: String,
      trim: true,
      default: SESSION_DEFAULTS.IP_ADDRESS,
    },

    // Current status of the session
    status: {
      type: String,
      enum: Object.values(SESSION_STATUS),
      default: SESSION_DEFAULTS.STATUS,
    },

    // Timestamp of last activity in this session
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
