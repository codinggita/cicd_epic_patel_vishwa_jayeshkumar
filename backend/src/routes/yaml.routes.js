/**
 * yaml.routes.js
 *
 * Defines REST API endpoints for YAML validation and formatting.
 *
 * Routes:
 *   POST /api/v1/yaml/validate - Validates syntax of input YAML
 *   POST /api/v1/yaml/format   - Formats/beautifies valid input YAML
 */

const express = require("express");
const { validateYamlContent, formatYamlContent } = require("../controllers/yaml.controller");

const router = express.Router();

// POST /api/v1/yaml/validate — Validate YAML content
router.post("/validate", validateYamlContent);

// POST /api/v1/yaml/format — Format and beautify YAML content
router.post("/format", formatYamlContent);

module.exports = router;
