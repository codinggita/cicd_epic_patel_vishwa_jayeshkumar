const {
  createActivity,
  getActivitiesByUserId,
} = require("../services/activity.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../config/constants");
const { ACTIVITY_MESSAGES } = require("../config/constants");

/**
 * POST /api/v1/activities
 * Creates a new activity record.
 *
 * Expects activity data in request body.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const create = asyncHandler(async (req, res) => {
  const activity = await createActivity(req.body);
  sendResponse(res, HTTP_STATUS.CREATED, ACTIVITY_MESSAGES.CREATED, activity);
});

/**
 * GET /api/v1/activities/:userId
 * Fetches all activities for a specific user.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const activities = await getActivitiesByUserId(userId);

  if (!activities || activities.length === 0) {
    return sendResponse(
      res,
      HTTP_STATUS.NOT_FOUND,
      ACTIVITY_MESSAGES.NOT_FOUND
    );
  }

  sendResponse(res, HTTP_STATUS.OK, ACTIVITY_MESSAGES.FETCHED, activities);
});

module.exports = {
  create,
  getByUserId,
};
