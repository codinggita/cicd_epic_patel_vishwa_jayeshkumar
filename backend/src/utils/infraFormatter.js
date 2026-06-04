/**
 * Infrastructure Formatter Utility
 *
 * Provides consistent JSON payload structures for infrastructure responses.
 * Ensures all API responses follow a standardized format.
 */

const { INFRA_MESSAGES } = require("../config/constants");

/**
 * Formats a single infrastructure guide response.
 *
 * @param {Object} infra - Infrastructure guide document
 * @returns {Object} - Formatted response
 */
const formatInfraGuide = (infra) => {
  if (!infra) {
    return null;
  }

  return {
    success: true,
    message: INFRA_MESSAGES.FETCHED,
    data: {
      id: infra._id,
      title: infra.title,
      description: infra.description,
      category: infra.category,
      platform: infra.platform,
      tags: infra.tags || [],
      content: infra.content,
      difficulty: infra.difficulty,
      views: infra.views || 0,
      likes: infra.likes || 0,
      createdBy: infra.createdBy,
      createdAt: infra.createdAt,
      updatedAt: infra.updatedAt,
    },
  };
};

/**
 * Formats multiple infrastructure guides response.
 *
 * @param {Array} infras - Array of infrastructure guide documents
 * @returns {Object} - Formatted response
 */
const formatInfraGuides = (infras) => {
  if (!infras || infras.length === 0) {
    return {
      success: true,
      message: INFRA_MESSAGES.FETCHED_ALL,
      data: [],
    };
  }

  return {
    success: true,
    message: INFRA_MESSAGES.FETCHED_ALL,
    data: infras.map((infra) => ({
      id: infra._id,
      title: infra.title,
      description: infra.description,
      category: infra.category,
      platform: infra.platform,
      tags: infra.tags || [],
      difficulty: infra.difficulty,
      views: infra.views || 0,
      likes: infra.likes || 0,
      createdBy: infra.createdBy,
      createdAt: infra.createdAt,
      updatedAt: infra.updatedAt,
    })),
  };
};

/**
 * Formats infrastructure guides by category response.
 *
 * @param {String} category - Category name
 * @param {Array} infras - Array of infrastructure guide documents
 * @returns {Object} - Formatted response
 */
const formatInfraByCategory = (category, infras) => {
  return {
    success: true,
    message: INFRA_MESSAGES.BY_CATEGORY,
    data: {
      category,
      count: infras.length,
      guides: infras.map((infra) => ({
        id: infra._id,
        title: infra.title,
        description: infra.description,
        platform: infra.platform,
        tags: infra.tags || [],
        difficulty: infra.difficulty,
        views: infra.views || 0,
        likes: infra.likes || 0,
        createdAt: infra.createdAt,
      })),
    },
  };
};

/**
 * Formats infrastructure guides by platform response.
 *
 * @param {String} platform - Platform name
 * @param {Array} infras - Array of infrastructure guide documents
 * @returns {Object} - Formatted response
 */
const formatInfraByPlatform = (platform, infras) => {
  return {
    success: true,
    message: INFRA_MESSAGES.BY_PLATFORM,
    data: {
      platform,
      count: infras.length,
      guides: infras.map((infra) => ({
        id: infra._id,
        title: infra.title,
        description: infra.description,
        category: infra.category,
        tags: infra.tags || [],
        difficulty: infra.difficulty,
        views: infra.views || 0,
        likes: infra.likes || 0,
        createdAt: infra.createdAt,
      })),
    },
  };
};

module.exports = {
  formatInfraGuide,
  formatInfraGuides,
  formatInfraByCategory,
  formatInfraByPlatform,
};
