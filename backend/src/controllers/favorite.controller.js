const {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
} = require("../services/favorite.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { FAVORITE_MESSAGES } = require("../constants/favorite.constants");

/**
 * POST /api/v1/favorites/:workflowId
 * Adds a workflow to the authenticated user's favorites.
 *
 * req.user is attached by the protect middleware before this runs.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const addFavorite = asyncHandler(async (req, res) => {
  const { workflowId } = req.params;

  const favorite = await addToFavorites(req.user._id, workflowId);

  sendResponse(res, HTTP_STATUS.CREATED, FAVORITE_MESSAGES.ADDED, favorite);
});

/**
 * DELETE /api/v1/favorites/:workflowId
 * Removes a workflow from the authenticated user's favorites.
 *
 * req.user is attached by the protect middleware before this runs.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const removeFavorite = asyncHandler(async (req, res) => {
  const { workflowId } = req.params;

  const favorite = await removeFromFavorites(req.user._id, workflowId);

  if (!favorite) {
    return sendResponse(
      res,
      HTTP_STATUS.NOT_FOUND,
      FAVORITE_MESSAGES.NOT_FAVORITED
    );
  }

  sendResponse(res, HTTP_STATUS.OK, FAVORITE_MESSAGES.REMOVED, favorite);
});

/**
 * GET /api/v1/favorites
 * Fetches all favorites for the authenticated user.
 *
 * req.user is attached by the protect middleware before this runs.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await getUserFavorites(req.user._id);

  if (!favorites || favorites.length === 0) {
    return sendResponse(
      res,
      HTTP_STATUS.NOT_FOUND,
      FAVORITE_MESSAGES.NOT_FOUND
    );
  }

  sendResponse(res, HTTP_STATUS.OK, FAVORITE_MESSAGES.FETCHED, favorites);
});

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
