/**
 * Comment Schema
 *
 * Represents a single comment left by a user on a workflow.
 *
 * Design decisions:
 *   - Flat structure (no nested/threaded replies) — keeps queries simple
 *     and the schema easy to extend later.
 *   - `isEdited` flag lets the frontend show an "edited" badge without
 *     storing the full edit history.
 *   - Compound index on { workflow, createdAt } speeds up the common query:
 *     "give me all comments for workflow X, newest first".
 *   - `ref` strings match the exact model names ("User", "Workflow") used in
 *     user.model.js and workflow.model.js so `.populate()` resolves correctly.
 */

const mongoose = require("mongoose");
const { COMMENT_CONTENT } = require("../constants/comment.constants");

const commentSchema = new mongoose.Schema(
  {
    // The user who wrote this comment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The workflow this comment belongs to
    workflow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },

    // The comment body
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: COMMENT_CONTENT.MAX_LENGTH,
    },

    // Set to true when the comment has been edited at least once.
    // Allows the UI to show an "edited" label without storing revision history.
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt managed by Mongoose
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

/**
 * Compound index — optimises the most common query pattern:
 * fetch all comments for a given workflow sorted by creation time.
 */
commentSchema.index({ workflow: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
