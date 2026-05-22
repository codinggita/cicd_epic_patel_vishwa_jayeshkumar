const Template = require("../models/template.model");

/**
 * Fetches all templates from the database.
 *
 * @returns {Array} - Array of template documents
 */
const getAllTemplates = async () => {
  const templates = await Template.find().sort({ createdAt: -1 });
  return templates;
};

/**
 * Creates a new template document in the database.
 *
 * @param {Object} data - Template fields from the request body
 * @param {String} userId - ID of the user creating the template
 * @returns {Object} - Newly created template document
 */
const createTemplate = async (data, userId) => {
  const { title, description, category, content } = data;

  const template = await Template.create({
    title,
    description,
    category,
    content,
    createdBy: userId,
  });

  return template;
};

module.exports = {
  getAllTemplates,
  createTemplate,
};
