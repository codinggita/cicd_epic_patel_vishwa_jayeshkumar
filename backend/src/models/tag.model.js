const mongoose = require("mongoose");
const { TAG_LIMITS } = require("../config/constants");

/**
 * Tag Schema
 *
 * Represents a searchable workflow tag stored in the database.
 * Each tag has a unique name and an auto-generated slug for
 * URL-safe usage (e.g., "GitHub Actions" → "github-actions").
 *
 * Fields:
 *   - name        : Human-readable label shown in the UI
 *   - slug        : URL-safe, lowercase version of name (auto-generated)
 *   - description : Optional short description of what the tag represents
 */
const tagSchema = new mongoose.Schema(
  {
    // Human-readable tag label — must be unique across all tags
    name: {
      type:      String,
      required:  true,
      trim:      true,
      unique:    true,
      maxlength: TAG_LIMITS.NAME_MAX_LENGTH,
    },

    // URL-safe version of name — generated in the service before saving
    // Example: "GitHub Actions" → "github-actions"
    slug: {
      type:     String,
      required: true,
      trim:     true,
      unique:   true,
      lowercase: true,
    },

    // Optional context about the tag — helps users understand its scope
    description: {
      type:      String,
      trim:      true,
      default:   "",
      maxlength: TAG_LIMITS.DESCRIPTION_MAX_LENGTH,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
