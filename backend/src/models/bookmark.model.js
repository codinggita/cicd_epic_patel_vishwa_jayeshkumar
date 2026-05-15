/**
 * Bookmark Schema
 *
 * Represents a single bookmark — a user saving a workflow for later.
 *
 * Design decisions:
 *   - Separate collection (not an array on the User document) so bookmarks
 *     can be queried, paginated, and sorted without loading the entire user.
 *   - Compound unique index on { user + workflow } enforces the invariant that
 *     a user can bookmark a given workflow at most once at the database level.
 *   - `ref` strings match the exact model names used in user.model.js and
 *     workflow.model.js ("User", "Workflow") so `.populate()` works correctly.
 */

const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    // The user who created this bookmark
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The workflow being bookmarked
    workflow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt tells us when the bookmark was made
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

/**
 * Compound unique index — prevents duplicate bookmarks at the DB level.
 * Also speeds up the "does this bookmark already exist?" lookup in the service.
 */
bookmarkSchema.index({ user: 1, workflow: 1 }, { unique: true });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
