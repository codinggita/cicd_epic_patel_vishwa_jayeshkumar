const {
  getAllTemplates,
  createTemplate,
} = require("../services/template.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { TEMPLATE_MESSAGES } = require("../constants/template.constants");

/**
 * GET /api/v1/templates
 * Returns all templates sorted by creation date.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getAll = asyncHandler(async (req, res) => {
  const templates = await getAllTemplates();
  sendResponse(res, HTTP_STATUS.OK, TEMPLATE_MESSAGES.FETCHED_ALL, templates);
});

/**
 * POST /api/v1/templates
 * Creates a new template.
 *
 * TODO (future PR): Add request body validation before calling service
 */
const create = asyncHandler(async (req, res) => {
  const template = await createTemplate(req.body, req.user.id);
  sendResponse(res, HTTP_STATUS.CREATED, TEMPLATE_MESSAGES.CREATED, template);
});

module.exports = { getAll, create };
