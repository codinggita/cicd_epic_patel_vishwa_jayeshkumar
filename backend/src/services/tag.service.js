/**
 * tag.service.js
 *
 * Service layer for the tag module.
 * Handles all database interactions — no HTTP concerns here.
 *
 * Rule of thumb for this layer:
 *   - Receive plain values (strings, objects).
 *   - Interact with Mongoose models.
 *   - Return plain data or throw an Error for the controller to handle.
 */

const Tag = require("../models/tag.model");
const { TAG_MESSAGES } = require("../config/constants");

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Converts a tag name into a URL-safe slug.
 * Example: "GitHub Actions" → "github-actions"
 *
 * @param {string} name - Raw tag name from the request body
 * @returns {string}    - Lowercase, hyphenated slug
 */
const generateSlug = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // strip special characters
    .replace(/\s+/g, "-");        // replace spaces with hyphens
};

// ─── createTag ────────────────────────────────────────────────────────────────

/**
 * Creates a new tag after verifying the name is not already taken.
 *
 * @param {Object} tagData          - Data from req.body
 * @param {string} tagData.name     - Required tag label
 * @param {string} [tagData.description] - Optional description
 * @returns {{ tag: Object }}       - The newly created tag document
 * @throws {Error} 409              - If a tag with the same name already exists
 */
const createTag = async ({ name, description }) => {
  const slug = generateSlug(name);

  // Check for duplicate before attempting to save
  const existing = await Tag.findOne({ slug });
  if (existing) {
    const error = new Error(TAG_MESSAGES.ALREADY_EXISTS);
    error.statusCode = 409;
    throw error;
  }

  const tag = await Tag.create({ name: name.trim(), slug, description });

  return { tag };
};

// ─── getAllTags ───────────────────────────────────────────────────────────────

/**
 * Fetches all tags sorted alphabetically by name.
 * Lightweight query — no pagination needed at this scale.
 *
 * @returns {{ tags: Array, total: number }}
 */
const getAllTags = async () => {
  const tags  = await Tag.find().sort({ name: 1 });
  const total = tags.length;

  return { tags, total };
};

module.exports = {
  createTag,
  getAllTags,
};
