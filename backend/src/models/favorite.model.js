const mongoose = require("mongoose");

/**
 * Favorite Schema
 *
 * Represents a user's favorite workflow in the database.
 * Allows users to save workflows they like for quick access.
 */
const favoriteSchema = new mongoose.Schema(
  {
    // Reference to the user who favorited the workflow
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to the workflow that was favorited
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Create a compound index to ensure a user can only favorite a workflow once
favoriteSchema.index({ userId: 1, workflowId: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
