/**
 * pagination utility
 *
 * Extracts and normalizes pagination parameters from query strings,
 * and formats the pagination metadata included in every paginated response.
 *
 * Usage in a service:
 *   const { page, limit, skip } = getPaginationParams(req.query);
 *   const results = await Model.find(filter).skip(skip).limit(limit);
 *   const meta = buildPaginationMeta(page, limit, totalCount);
 *
 * Query params accepted:
 *   ?page=1&limit=10
 */

/**
 * Parses page and limit from query params with safe defaults.
 *
 * @param {Object} query - Express req.query object
 * @returns {{ page: number, limit: number, skip: number }}
 */
const getPaginationParams = (query) => {
  // Default: page 1, 10 results per page
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit) || 10)); // Cap at 50 per page

  // MongoDB's skip() uses a 0-based offset
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Builds the pagination metadata object to include in API responses.
 *
 * @param {number} page       - Current page number
 * @param {number} limit      - Items per page
 * @param {number} totalCount - Total number of matching documents
 * @returns {Object} Pagination meta
 */
const buildPaginationMeta = (page, limit, totalCount) => {
  return {
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    totalCount,
    perPage: limit,
    hasNextPage: page < Math.ceil(totalCount / limit),
    hasPrevPage: page > 1,
  };
};

module.exports = { getPaginationParams, buildPaginationMeta };
