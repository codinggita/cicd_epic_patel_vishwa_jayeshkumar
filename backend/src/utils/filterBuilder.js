/**
 * filterBuilder utility
 *
 * Dynamically constructs a MongoDB query filter object from
 * URL query parameters. Keeps all filter-building logic in one
 * place so controllers and services stay clean.
 *
 * Supported query params:
 *   ?keyword=docker       → regex search on title and description
 *   ?category=jenkins     → exact match on category field
 *   ?tag=beginner         → checks if tags array contains the value
 *   ?sortBy=createdAt     → field to sort by (default: createdAt)
 *   ?sortOrder=desc       → asc or desc (default: desc)
 *
 * Usage:
 *   const { filter, sortOptions } = buildWorkflowFilter(req.query);
 *   const results = await Workflow.find(filter).sort(sortOptions);
 */

/**
 * Builds a MongoDB filter object from query parameters.
 *
 * @param {Object} query - Express req.query object
 * @returns {{ filter: Object, sortOptions: Object }}
 */
const buildWorkflowFilter = (query) => {
  const filter = {
    isArchived: false, // Always exclude archived workflows from search
  };

  // Keyword search: case-insensitive regex match on title and description
  if (query.keyword && query.keyword.trim() !== "") {
    const regex = new RegExp(query.keyword.trim(), "i");
    filter.$or = [{ title: regex }, { description: regex }];
  }

  // Category filter: must exactly match one of the WORKFLOW_CATEGORIES enum values
  if (query.category && query.category.trim() !== "") {
    filter.category = query.category.trim().toLowerCase();
  }

  // Tag filter: checks if the tags array contains this specific value
  if (query.tag && query.tag.trim() !== "") {
    filter.tags = { $in: [query.tag.trim().toLowerCase()] };
  }

  // Sort options — default to newest first
  const sortField = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;
  const sortOptions = { [sortField]: sortOrder };

  return { filter, sortOptions };
};

module.exports = { buildWorkflowFilter };
