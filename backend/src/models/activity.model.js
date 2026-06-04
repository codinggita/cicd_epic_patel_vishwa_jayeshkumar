const mongoose = require("mongoose");
const {
  ACTIVITY_ACTIONS,
  RESOURCE_TYPES,
  ACTIVITY_DEFAULTS,
} = require("../config/constants");

/**
 * Activity Schema
 *
 * Represents a user activity record in the database.
 * Tracks user actions on various resources for audit and history purposes.
 */
const activitySchema = new mongoose.Schema(
  {
    // Reference to the user who performed the action
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Type of action performed (e.g., create, update, delete, view)
    action: {
      type: String,
      enum: Object.values(ACTIVITY_ACTIONS),
      required: true,
    },

    // Type of resource affected (e.g., workflow, category, tag)
    resourceType: {
      type: String,
      enum: Object.values(RESOURCE_TYPES),
      required: true,
    },

    // ID of the resource affected
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // Human-readable description of the activity
    description: {
      type: String,
      trim: true,
      default: ACTIVITY_DEFAULTS.DESCRIPTION,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
