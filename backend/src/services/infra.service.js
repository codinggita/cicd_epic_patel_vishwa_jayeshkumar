/**
 * Infrastructure Service
 *
 * Implements business logic for infrastructure guide operations.
 * Handles database interactions and business rules.
 */

const Infrastructure = require("../models/infra.model");
const { INFRA_MESSAGES } = require("../config/constants");

/**
 * Fetches all infrastructure guides from the database.
 * Only returns non-archived guides to keep the list clean.
 *
 * @returns {Array} - Array of infrastructure guide documents
 */
const getAllInfraGuides = async () => {
  const infras = await Infrastructure.find({ isArchived: false }).populate(
    "createdBy",
    "name email"
  );
  return infras;
};

/**
 * Fetches a single infrastructure guide by its MongoDB _id.
 * Returns null if not found — the controller handles the 404 response.
 *
 * @param {String} id - Infrastructure guide ID
 * @returns {Object} - Infrastructure guide document
 */
const getInfraGuideById = async (id) => {
  const infra = await Infrastructure.findById(id).populate(
    "createdBy",
    "name email"
  );
  return infra;
};

/**
 * Fetches infrastructure guides by category.
 *
 * @param {String} category - Category name
 * @returns {Array} - Array of infrastructure guide documents
 */
const getInfraGuidesByCategory = async (category) => {
  const infras = await Infrastructure.find({
    category,
    isArchived: false,
  }).populate("createdBy", "name email");
  return infras;
};

/**
 * Fetches infrastructure guides by platform.
 *
 * @param {String} platform - Platform name
 * @returns {Array} - Array of infrastructure guide documents
 */
const getInfraGuidesByPlatform = async (platform) => {
  const infras = await Infrastructure.find({
    platform,
    isArchived: false,
  }).populate("createdBy", "name email");
  return infras;
};

/**
 * Creates a new infrastructure guide document in the database.
 *
 * @param {Object} data - Validated infrastructure guide fields from the request body
 * @param {String} userId - _id of the authenticated user (from req.user)
 * @returns {Object} - Created infrastructure guide document
 */
const createInfraGuide = async (data, userId) => {
  const {
    title,
    description,
    category,
    platform,
    tags,
    content,
    difficulty,
  } = data;

  const infra = await Infrastructure.create({
    title,
    description,
    category,
    platform,
    tags,
    content,
    difficulty,
    createdBy: userId,
  });

  return infra;
};

/**
 * Updates an existing infrastructure guide.
 *
 * @param {String} id - Infrastructure guide ID
 * @param {Object} data - Updated infrastructure guide fields
 * @param {String} userId - User ID for ownership check
 * @returns {Object} - Updated infrastructure guide document
 */
const updateInfraGuide = async (id, data, userId) => {
  const infra = await Infrastructure.findById(id);
  if (!infra) {
    const error = new Error(INFRA_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (infra.createdBy.toString() !== userId) {
    const error = new Error("Unauthorized: Only guide owner can update");
    error.statusCode = 403;
    throw error;
  }

  const updatedInfra = await Infrastructure.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  ).populate("createdBy", "name email");

  return updatedInfra;
};

/**
 * Permanently deletes an infrastructure guide from the database by its _id.
 *
 * @param {String} id - Infrastructure guide ID
 * @param {String} userId - User ID for ownership check
 * @returns {Object} - Deleted infrastructure guide document
 */
const deleteInfraGuide = async (id, userId) => {
  const infra = await Infrastructure.findById(id);
  if (!infra) {
    const error = new Error(INFRA_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (infra.createdBy.toString() !== userId) {
    const error = new Error("Unauthorized: Only guide owner can delete");
    error.statusCode = 403;
    throw error;
  }

  const deletedInfra = await Infrastructure.findByIdAndDelete(id);
  return deletedInfra;
};

/**
 * Archives an infrastructure guide.
 *
 * @param {String} id - Infrastructure guide ID
 * @param {String} userId - User ID for ownership check
 * @returns {Object} - Updated infrastructure guide document
 */
const archiveInfraGuide = async (id, userId) => {
  const infra = await Infrastructure.findById(id);
  if (!infra) {
    const error = new Error(INFRA_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (infra.createdBy.toString() !== userId) {
    const error = new Error("Unauthorized: Only guide owner can archive");
    error.statusCode = 403;
    throw error;
  }

  infra.isArchived = true;
  await infra.save();

  return infra;
};

/**
 * Restores an archived infrastructure guide.
 *
 * @param {String} id - Infrastructure guide ID
 * @param {String} userId - User ID for ownership check
 * @returns {Object} - Updated infrastructure guide document
 */
const restoreInfraGuide = async (id, userId) => {
  const infra = await Infrastructure.findById(id);
  if (!infra) {
    const error = new Error(INFRA_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (infra.createdBy.toString() !== userId) {
    const error = new Error("Unauthorized: Only guide owner can restore");
    error.statusCode = 403;
    throw error;
  }

  infra.isArchived = false;
  await infra.save();

  return infra;
};

module.exports = {
  getAllInfraGuides,
  getInfraGuideById,
  getInfraGuidesByCategory,
  getInfraGuidesByPlatform,
  createInfraGuide,
  updateInfraGuide,
  deleteInfraGuide,
  archiveInfraGuide,
  restoreInfraGuide,
};
