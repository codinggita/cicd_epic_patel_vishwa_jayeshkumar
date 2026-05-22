const mongoose = require("mongoose");

/**
 * Version Schema
 *
 * Represents a workflow version in the database.
 * Versions track the history of changes to workflows.
 */
const versionSchema = new mongoose.Schema(
  {
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },

    versionNumber: {
      type: Number,
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Version = mongoose.model("Version", versionSchema);

module.exports = Version;
