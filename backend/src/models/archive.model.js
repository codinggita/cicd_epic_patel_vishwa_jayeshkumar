const mongoose = require("mongoose");
const { ARCHIVE_DEFAULTS } = require("../config/constants");

/**
 * Archive Schema
 *
 * Represents an archived workflow record in the database.
 * Tracks workflow archival history for audit and restoration purposes.
 */
const archiveSchema = new mongoose.Schema(
  {
    // Reference to the workflow that was archived
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },

    // Reference to the user who archived the workflow
    archivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reason for archiving the workflow
    reason: {
      type: String,
      trim: true,
      default: ARCHIVE_DEFAULTS.REASON,
    },

    // Timestamp when the workflow was archived
    archivedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;
