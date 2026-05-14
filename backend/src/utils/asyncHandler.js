/**
 * asyncHandler utility
 *
 * Wraps an async controller function and automatically catches any
 * errors, passing them to Express's next() error handler.
 *
 * Without asyncHandler — every controller needs its own try/catch:
 *   const getAll = async (req, res, next) => {
 *     try { ... } catch (err) { next(err); }
 *   };
 *
 * With asyncHandler — controllers stay clean and focused:
 *   const getAll = asyncHandler(async (req, res) => { ... });
 *
 * @param {Function} fn - An async Express route handler
 * @returns {Function} - A wrapped Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
