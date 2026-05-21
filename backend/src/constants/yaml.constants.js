/**
 * yaml.constants.js
 *
 * Centralizes response messages and client error strings for the YAML utility module.
 */

const YAML_MESSAGES = {
  VALIDATION_SUCCESS: "YAML content is valid.",
  VALIDATION_FAILURE: "YAML content contains syntax errors.",
  FORMAT_SUCCESS:     "YAML content formatted successfully.",
  MISSING_CONTENT:    "YAML content is required.",
};

module.exports = {
  YAML_MESSAGES,
};
