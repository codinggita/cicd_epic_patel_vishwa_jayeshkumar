/**
 * Review Schema
 *
 * Represents a single rating + review left by a user on a workflow.
 *
 * Design decisions:
 *   - One review per user per workflow (enforced by a unique compound index).
 *     This keeps the average-rating calculation straightforward and prevents
 *     duplicate submissions without any extra application-level guard.
 *   - `rating` is stored as a Number (1–5) so it can be averaged directly
 *     in a future aggregation without a type conversion step.
 *   - `isEdited` flag lets the frontend show an "edited" badge without
 *     storing full revision history.
 *   - Compound index on { workflow, createdAt } speeds up the most common
 *     read: "all reviews for workflow X, newest first."
 *   - `ref` strings match the exact model names ("User", "Workflow") used in
 *     user.model.js and workflow.model.js so `.populate()` resolves correctly.
 */

const mongoose = require("mongoose");
const {
  REVIEW_RATING,
  REVIEW_CONTENT,
} = require("../config/constants");

const reviewSchema = new mongoose.Schema(
  {
    // The user who wrote this review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The workflow being reviewed
    workflow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },

    // Numeric star rating (1–5 inclusive)
    rating: {
      type:     Number,
      required: true,
      min:      REVIEW_RATING.MIN,
      max:      REVIEW_RATING.MAX,
    },

    // Optional written review body
    review: {
      type:      String,
      trim:      true,
      maxlength: REVIEW_CONTENT.MAX_LENGTH,
      default:   "",
    },

    // Set to true when the review has been edited at least once.
    // Allows the UI to show an "edited" label without storing revision history.
    isEdited: {
      type:    Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt managed by Mongoose
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

/**
 * Unique compound index — one review per user per workflow.
 * Attempting a second insert for the same pair throws a duplicate-key error
 * (code 11000), which the service layer catches and maps to a 409 response.
 */
reviewSchema.index({ user: 1, workflow: 1 }, { unique: true });

/**
 * Compound index — optimises the most common query pattern:
 * fetch all reviews for a given workflow sorted by creation time.
 */
reviewSchema.index({ workflow: 1, createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
