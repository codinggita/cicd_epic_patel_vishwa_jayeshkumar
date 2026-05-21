/**
 * yaml.service.js
 *
 * Service layer for the YAML utility module.
 * Provides custom, robust, and dependency-free validation and formatting
 * for YAML content.
 */

const { YAML_MESSAGES } = require("../constants/yaml.constants");

/**
 * Validates a string to ensure it adheres to standard YAML formatting rules.
 * Checks for:
 *  1. Tab characters used for indentation (illegal in YAML).
 *  2. Unclosed quotes (single or double).
 *  3. Map keys without a trailing space after the colon (e.g., `key:value` instead of `key: value`).
 *  4. List hyphens without a space after them (e.g., `-item` instead of `- item`).
 *  5. Inconsistent or random indentation increases.
 *
 * @param {string} yamlContent - The raw YAML string to validate
 * @returns {Object}           - { isValid: boolean, error: string|null, line: number|null }
 */
const validateYaml = async (yamlContent) => {
  if (typeof yamlContent !== "string") {
    return {
      isValid: false,
      error: "YAML content must be a string.",
      line: null,
    };
  }

  const lines = yamlContent.split(/\r?\n/);
  let previousIndent = 0;
  const indentStack = [0];

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const rawLine = lines[i];
    const trimmedLine = rawLine.trim();

    // Skip empty lines or comment lines
    if (trimmedLine === "" || trimmedLine.startsWith("#")) {
      continue;
    }

    // 1. Check for tabs used for indentation
    const leadingWhitespace = rawLine.match(/^\s*/)[0];
    if (leadingWhitespace.includes("\t")) {
      return {
        isValid: false,
        error: "Tab characters are not allowed for indentation. Use spaces instead.",
        line: lineNum,
      };
    }

    const currentIndent = leadingWhitespace.length;

    // 2. Check for inconsistent indentation increase
    if (currentIndent > previousIndent) {
      indentStack.push(currentIndent);
    } else if (currentIndent < previousIndent) {
      // Indentation decreased: pop stack until matching level is found
      while (indentStack.length > 0 && indentStack[indentStack.length - 1] > currentIndent) {
        indentStack.pop();
      }
      if (indentStack.length === 0 || indentStack[indentStack.length - 1] !== currentIndent) {
        return {
          isValid: false,
          error: `Inconsistent indentation level. Expected to align with a previous block level (found ${currentIndent} spaces).`,
          line: lineNum,
        };
      }
    }
    previousIndent = currentIndent;

    // 3. Check for unclosed quotes
    const singleQuotes = (trimmedLine.match(/'/g) || []).length;
    const doubleQuotes = (trimmedLine.match(/"/g) || []).length;
    if (singleQuotes % 2 !== 0) {
      return {
        isValid: false,
        error: "Unclosed single quote (').",
        line: lineNum,
      };
    }
    if (doubleQuotes % 2 !== 0) {
      return {
        isValid: false,
        error: 'Unclosed double quote (").',
        line: lineNum,
      };
    }

    // 4. Verify colon key-value pair syntax
    if (trimmedLine.includes(":")) {
      const colonIndex = trimmedLine.indexOf(":");
      const charAfterColon = trimmedLine.charAt(colonIndex + 1);
      if (charAfterColon && charAfterColon !== " " && charAfterColon !== "\n" && charAfterColon !== "\r") {
        const isUrl = trimmedLine.match(/https?:\/\//);
        const isQuoted = (trimmedLine.startsWith("'") && trimmedLine.endsWith("'")) ||
                         (trimmedLine.startsWith('"') && trimmedLine.endsWith('"'));
        if (!isUrl && !isQuoted) {
          return {
            isValid: false,
            error: "Keys must be followed by a colon and a space (e.g., 'key: value').",
            line: lineNum,
          };
        }
      }
    }

    // 5. Verify list hyphens
    if (trimmedLine.startsWith("-")) {
      if (trimmedLine.length > 1 && trimmedLine.charAt(1) !== " ") {
        return {
          isValid: false,
          error: "List items starting with a hyphen must be followed by a space (e.g., '- item').",
          line: lineNum,
        };
      }
    }
  }

  return {
    isValid: true,
    error: null,
    line: null,
  };
};

/**
 * Formats/beautifies a YAML string by standardizing spacing and indentations.
 *
 * @param {string} yamlContent - The raw YAML string to format
 * @returns {string}           - The formatted and beautified YAML string
 */
const formatYaml = async (yamlContent) => {
  const lines = yamlContent.split(/\r?\n/);
  const formattedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmedLine = rawLine.trim();

    // Preserve empty lines but remove duplicate consecutive blank lines
    if (trimmedLine === "") {
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== "") {
        formattedLines.push("");
      }
      continue;
    }

    // Get original indentation size
    const leadingSpaces = rawLine.match(/^\s*/)[0].replace(/\t/g, "  ").length;
    
    let processedLine = trimmedLine;

    // Standardize space after list hyphen
    if (processedLine.startsWith("-") && processedLine.length > 1 && processedLine.charAt(1) !== " ") {
      processedLine = "- " + processedLine.substring(1);
    }

    // Standardize space after colons in maps
    if (processedLine.includes(":") && !processedLine.startsWith("#")) {
      const colonIndex = processedLine.indexOf(":");
      const charAfterColon = processedLine.charAt(colonIndex + 1);
      const isUrl = processedLine.match(/https?:\/\//);
      const isQuoted = (processedLine.startsWith("'") && processedLine.endsWith("'")) ||
                       (processedLine.startsWith('"') && processedLine.endsWith('"'));
      
      if (charAfterColon && charAfterColon !== " " && !isUrl && !isQuoted) {
        processedLine = processedLine.substring(0, colonIndex + 1) + " " + processedLine.substring(colonIndex + 1);
      }
    }

    // Reconstruct the line with clean indentation
    const indent = " ".repeat(leadingSpaces);
    formattedLines.push(indent + processedLine);
  }

  // Remove leading/trailing empty lines
  while (formattedLines.length > 0 && formattedLines[0] === "") {
    formattedLines.shift();
  }
  while (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] === "") {
    formattedLines.pop();
  }

  return formattedLines.join("\n");
};

module.exports = {
  validateYaml,
  formatYaml,
};
