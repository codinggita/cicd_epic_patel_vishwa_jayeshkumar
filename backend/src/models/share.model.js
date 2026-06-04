const mongoose = require("mongoose");
const {
  SHARE_PERMISSIONS,
  SHARE_DEFAULTS,
} = require("../config/constants");

/**
 * Share Schema
 *
 * Represents a workflow share record in the database.
 * Tracks workflow sharing between users with permission levels.
 */
const shareSchema = new mongoose.Schema(
  {
    // Reference to the workflow being shared
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },

    // Reference to the user who shared the workflow
    sharedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to the user with whom the workflow is shared
    sharedWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Permission level for the shared workflow
    permission: {
      type: String,
      enum: Object.values(SHARE_PERMISSIONS),
      default: SHARE_DEFAULTS.PERMISSION,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Create a compound index to ensure a workflow is shared with a user only once
shareSchema.index({ workflowId: 1, sharedWith: 1 }, { unique: true });

const Share = mongoose.model("Share", shareSchema);

module.exports = Share;
