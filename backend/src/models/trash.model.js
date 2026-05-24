const mongoose = require("mongoose");

/**
 * Trash Schema
 *
 * Represents a trashed workflow record in the database.
 * Tracks workflow deletion history for restoration purposes.
 */
const trashSchema = new mongoose.Schema(
  {
    // Reference to the workflow that was moved to trash
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },

    // Reference to the user who moved the workflow to trash
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Timestamp when the workflow was moved to trash
    deletedAt: {
      type: Date,
      default: Date.now,
    },

    // Status of the workflow restoration
    restoreStatus: {
      type: String,
      enum: ["active", "restored"],
      default: "active",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Trash = mongoose.model("Trash", trashSchema);

module.exports = Trash;
