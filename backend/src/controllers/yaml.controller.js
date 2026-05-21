/**
 * yaml.controller.js
 *
 * Controller layer for YAML utility endpoints.
 * Handles Express requests, triggers validation or formatting, and responds to clients.
 */

const asyncHandler = require("../utils/asyncHandler");
const { sendResponse } = require("../utils/apiResponse");
const yamlService = require("../services/yaml.service");
const yamlFormatter = require("../utils/yamlFormatter");
const { YAML_MESSAGES } = require("../constants/yaml.constants");
const HTTP_STATUS = require("../constants/httpStatus");

/**
 * POST /api/v1/yaml/validate
 *
 * Validates the YAML string sent in the request body.
 * Expects: { yamlContent: "..." }
 */
const validateYamlContent = asyncHandler(async (req, res) => {
  const { yamlContent } = req.body;

  if (yamlContent === undefined || yamlContent === null) {
    return sendResponse(res, HTTP_STATUS.BAD_REQUEST, YAML_MESSAGES.MISSING_CONTENT);
  }

  const result = await yamlService.validateYaml(yamlContent);
  const formattedResult = yamlFormatter.formatValidationResult(result.isValid, result.error, result.line);

  if (!result.isValid) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      YAML_MESSAGES.VALIDATION_FAILURE,
      formattedResult
    );
  }

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    YAML_MESSAGES.VALIDATION_SUCCESS,
    formattedResult
  );
});

/**
 * POST /api/v1/yaml/format
 *
 * Validates and formats/beautifies the YAML string sent in the request body.
 * Expects: { yamlContent: "..." }
 */
const formatYamlContent = asyncHandler(async (req, res) => {
  const { yamlContent } = req.body;

  if (yamlContent === undefined || yamlContent === null) {
    return sendResponse(res, HTTP_STATUS.BAD_REQUEST, YAML_MESSAGES.MISSING_CONTENT);
  }

  // Verify it is valid YAML first before attempting to format
  const validation = await yamlService.validateYaml(yamlContent);
  if (!validation.isValid) {
    const formattedValidation = yamlFormatter.formatValidationResult(
      validation.isValid,
      validation.error,
      validation.line
    );
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      YAML_MESSAGES.VALIDATION_FAILURE,
      formattedValidation
    );
  }

  const formattedYaml = await yamlService.formatYaml(yamlContent);
  const formattedResult = yamlFormatter.formatYamlBeautifyResult(formattedYaml);

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    YAML_MESSAGES.FORMAT_SUCCESS,
    formattedResult
  );
});

module.exports = {
  validateYamlContent,
  formatYamlContent,
};
