/**
 * Monitoring Constants
 *
 * Centralizes all static values used across the monitoring module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for monitoring operations
const MONITORING_MESSAGES = {
  UPTIME_FETCHED: "Uptime information fetched successfully",
  CPU_FETCHED: "CPU usage information fetched successfully",
  MEMORY_FETCHED: "Memory usage information fetched successfully",
};

// Memory units for display
const MEMORY_UNITS = {
  BYTES: "bytes",
  KILOBYTES: "KB",
  MEGABYTES: "MB",
  GIGABYTES: "GB",
};

// CPU status thresholds
const CPU_THRESHOLDS = {
  LOW: 30,
  MEDIUM: 70,
  HIGH: 90,
};

module.exports = {
  MONITORING_MESSAGES,
  MEMORY_UNITS,
  CPU_THRESHOLDS,
};
