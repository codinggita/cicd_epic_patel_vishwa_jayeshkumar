/**
 * Infrastructure Controller
 *
 * Defines functions to handle requests for infrastructure guide operations.
 * Uses asyncHandler for automatic error handling and sendResponse for consistent responses.
 */

const {
  getAllInfraGuides,
  getInfraGuideById,
  getInfraGuidesByCategory,
  getInfraGuidesByPlatform,
  createInfraGuide,
  updateInfraGuide,
  deleteInfraGuide,
  archiveInfraGuide,
  restoreInfraGuide,
} = require("../services/infra.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../config/constants");
const { INFRA_MESSAGES } = require("../config/constants");

/**
 * GET /api/v1/infra
 * Returns all non-archived infrastructure guides with creator info populated.
 */
const getAll = asyncHandler(async (req, res) => {
  const infras = await getAllInfraGuides();
  sendResponse(res, HTTP_STATUS.OK, INFRA_MESSAGES.FETCHED_ALL, infras);
});

/**
 * GET /api/v1/infra/:id
 * Returns a single infrastructure guide by ID with creator info populated.
 */
const getById = asyncHandler(async (req, res) => {
  const infra = await getInfraGuideById(req.params.id);

  if (!infra || infra.isArchived) {
    return sendResponse(res, HTTP_STATUS.NOT_FOUND, INFRA_MESSAGES.NOT_FOUND);
  }

  sendResponse(res, HTTP_STATUS.OK, INFRA_MESSAGES.FETCHED, infra);
});

/**
 * GET /api/v1/infra/category/:category
 * Returns infrastructure guides filtered by category.
 */
const getByCategory = asyncHandler(async (req, res) => {
  const infras = await getInfraGuidesByCategory(req.params.category);
  sendResponse(res, HTTP_STATUS.OK, INFRA_MESSAGES.BY_CATEGORY, infras);
});

/**
 * GET /api/v1/infra/platform/:platform
 * Returns infrastructure guides filtered by platform.
 */
const getByPlatform = asyncHandler(async (req, res) => {
  const infras = await getInfraGuidesByPlatform(req.params.platform);
  sendResponse(res, HTTP_STATUS.OK, INFRA_MESSAGES.BY_PLATFORM, infras);
});

/**
 * POST /api/v1/infra
 * Creates a new infrastructure guide for the authenticated user.
 */
const create = asyncHandler(async (req, res) => {
  const infra = await createInfraGuide(req.body, req.user._id);
  sendResponse(res, HTTP_STATUS.CREATED, INFRA_MESSAGES.CREATED, infra);
});

/**
 * PUT /api/v1/infra/:id
 * Updates an existing infrastructure guide.
 */
const update = asyncHandler(async (req, res) => {
  const infra = await updateInfraGuide(req.params.id, req.body, req.user._id);
  sendResponse(res, HTTP_STATUS.OK, INFRA_MESSAGES.UPDATED, infra);
});

/**
 * DELETE /api/v1/infra/:id
 * Permanently deletes an infrastructure guide from the database.
 */
const remove = asyncHandler(async (req, res) => {
  const infra = await deleteInfraGuide(req.params.id, req.user._id);
  sendResponse(res, HTTP_STATUS.OK, INFRA_MESSAGES.DELETED);
});

/**
 * PATCH /api/v1/infra/:id/archive
 * Archives an infrastructure guide.
 */
const archive = asyncHandler(async (req, res) => {
  const infra = await archiveInfraGuide(req.params.id, req.user._id);
  sendResponse(res, HTTP_STATUS.OK, INFRA_MESSAGES.UPDATED, infra);
});

/**
 * PATCH /api/v1/infra/:id/restore
 * Restores an archived infrastructure guide.
 */
const restore = asyncHandler(async (req, res) => {
  const infra = await restoreInfraGuide(req.params.id, req.user._id);
  sendResponse(res, HTTP_STATUS.OK, INFRA_MESSAGES.UPDATED, infra);
});

module.exports = {
  getAll,
  getById,
  getByCategory,
  getByPlatform,
  create,
  update,
  remove,
  archive,
  restore,
};
