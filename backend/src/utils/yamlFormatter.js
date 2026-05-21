/**
 * yamlFormatter.js
 *
 * Reusable utility to format raw YAML validation and beautification payloads
 * into standard REST API shapes.
 */

/**
 * Formats a validation result payload.
 *
 * @param {boolean} isValid   - Whether the YAML is syntax-valid
 * @param {string|null} error - Error description if invalid
 * @param {number|null} line  - Line number of the syntax error
 * @returns {Object}          - Formatted validation response payload
 */
const formatValidationResult = (isValid, error = null, line = null) => {
  return {
    isValid,
    error: error || null,
    line: line || null,
  };
};

/**
 * Formats a YAML formatting/beautification result payload.
 *
 * @param {string} formattedYaml - The pretty-printed YAML content
 * @returns {Object}             - Formatted beautification response payload
 */
const formatYamlBeautifyResult = (formattedYaml) => {
  return {
    formattedYaml,
  };
};

module.exports = {
  formatValidationResult,
  formatYamlBeautifyResult,
};
