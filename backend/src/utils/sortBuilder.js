/**
 * sortBuilder utility
 *
 * Builds a Mongoose-compatible sort object from a plain-English field name
 * and direction string. Validates against a whitelist to prevent injection.
 *
 * Why a utility?
 *   Multiple query endpoints (latest, popular, recommended, trending) all need
 *   sorting. Centralising the logic here means consistent validation and a
 *   single place to extend allowed fields in the future.
 *
 * Usage:
 *   const sort = buildSort("views", "desc");
 *   // → { views: -1 }
 *
 *   const sort = buildSort("createdAt");
 *   // → { createdAt: -1 }   (default direction is descending)
 *
 *   const sort = buildSort("unknown", "asc");
 *   // → { createdAt: -1 }   (falls back to safe default)
 *
 * @param {string} field     - Field name to sort by (e.g. "views", "likes")
 * @param {string} direction - "asc" or "desc" (default: "desc")
 * @returns {Object}         - Mongoose sort object e.g. { views: -1 }
 */

const { ALLOWED_SORT_FIELDS, SORT_ORDER } = require("../constants/workflow.constants");

// Default sort used as a safe fallback when invalid input is received
const DEFAULT_SORT = { createdAt: SORT_ORDER.DESC };

const buildSort = (field = "createdAt", direction = "desc") => {
  // Guard — reject fields that are not on the whitelist
  const safeField = ALLOWED_SORT_FIELDS.includes(field) ? field : "createdAt";

  // Guard — accept only "asc" or "desc", default to "desc"
  const safeDirection =
    direction === "asc" ? SORT_ORDER.ASC : SORT_ORDER.DESC;

  return { [safeField]: safeDirection };
};

module.exports = { buildSort, DEFAULT_SORT };
