/**
 * Log Constants
 *
 * Centralizes all static values used across the log module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for log operations
const LOG_MESSAGES = {
  LOGS_FETCHED: "Logs fetched successfully",
  LATEST_LOGS_FETCHED: "Latest logs fetched successfully",
  ERROR_LOGS_FETCHED: "Error logs fetched successfully",
};

// Log levels
const LOG_LEVELS = {
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  DEBUG: "debug",
};

// Mock log data for demonstration
const MOCK_LOGS = [
  {
    id: "1",
    level: "info",
    message: "Server started successfully",
    timestamp: new Date().toISOString(),
    source: "server",
  },
  {
    id: "2",
    level: "info",
    message: "Database connection established",
    timestamp: new Date().toISOString(),
    source: "database",
  },
  {
    id: "3",
    level: "warn",
    message: "High memory usage detected",
    timestamp: new Date().toISOString(),
    source: "system",
  },
  {
    id: "4",
    level: "error",
    message: "Failed to connect to external API",
    timestamp: new Date().toISOString(),
    source: "api",
  },
  {
    id: "5",
    level: "info",
    message: "User authentication successful",
    timestamp: new Date().toISOString(),
    source: "auth",
  },
];

module.exports = {
  LOG_MESSAGES,
  LOG_LEVELS,
  MOCK_LOGS,
};
