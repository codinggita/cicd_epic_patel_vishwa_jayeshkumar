const mongoose = require("mongoose");
const {
  WORKFLOW_CATEGORIES,
  WORKFLOW_DIFFICULTY,
  WORKFLOW_DEFAULTS,
} = require("../constants/workflow.constants");

/**
 * Workflow Schema
 *
 * Represents a CI/CD workflow document in the database.
 * Fields are mapped from the cicd-epic dataset:
 *   - instruction  → title
 *   - topic        → category
 *   - difficulty   → stored in tags[]
 *   - output       → yamlContent
 */
const workflowSchema = new mongoose.Schema(
  {
    // Core content fields
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // The raw YAML/CI config content (maps from dataset `output` field)
    yamlContent: {
      type: String,
      default: "",
    },

    // CI/CD platform category (maps from dataset `topic` field)
    category: {
      type: String,
      enum: WORKFLOW_CATEGORIES,
      required: true,
    },

    // Searchable tags — e.g., ["github-actions", "intermediate", "docker"]
    tags: {
      type: [String],
      default: [],
    },

    // Reference to the user who created this workflow
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Soft-delete / archiving support
    isArchived: {
      type: Boolean,
      default: WORKFLOW_DEFAULTS.IS_ARCHIVED,
    },

    // Engagement metrics (incremented via dedicated service methods)
    views: {
      type: Number,
      default: WORKFLOW_DEFAULTS.VIEWS,
    },

    likes: {
      type: Number,
      default: WORKFLOW_DEFAULTS.LIKES,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Workflow = mongoose.model("Workflow", workflowSchema);

module.exports = Workflow;
