/**
 * systemInfoFormatter.js
 *
 * Utility helper to format raw system information (memory bytes, seconds, envs)
 * before returning it to the client. This ensures consistent responses and clean logs.
 */

/**
 * Formats uptime in seconds into a human-readable string (e.g., "1d 4h 32m 15s")
 *
 * @param {number} uptimeSeconds - Uptime in seconds
 * @returns {Object}             - Formatted uptime payload
 */
const formatUptime = (uptimeSeconds) => {
  const days = Math.floor(uptimeSeconds / (3600 * 24));
  const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);

  return {
    rawSeconds: uptimeSeconds,
    formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
  };
};

/**
 * Formats memory usage bytes into human-readable strings (MB).
 *
 * @param {Object} memoryUsage - Memory usage object from process.memoryUsage()
 * @returns {Object}           - Formatted memory usage statistics
 */
const formatMemory = (memoryUsage) => {
  const toMB = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

  return {
    rss: toMB(memoryUsage.rss),
    heapTotal: toMB(memoryUsage.heapTotal),
    heapUsed: toMB(memoryUsage.heapUsed),
    external: toMB(memoryUsage.external),
    raw: memoryUsage,
  };
};

/**
 * Formats environment variables and info.
 *
 * @returns {Object} - Sanitized environment summary
 */
const formatEnvironment = () => {
  return {
    nodeVersion: process.version,
    platform: process.platform,
    env: process.env.NODE_ENV || "development",
  };
};

/**
 * Formats general API and system status.
 *
 * @param {string} apiStatus   - Current API status (e.g., "healthy")
 * @param {Object} uptimeData  - Formatted uptime data
 * @param {Object} memoryData  - Formatted memory data
 * @returns {Object}           - Consolidated system health object
 */
const formatSystemStatus = (apiStatus, uptimeData, memoryData) => {
  return {
    status: apiStatus,
    timestamp: new Date().toISOString(),
    uptime: uptimeData,
    memory: memoryData,
  };
};

module.exports = {
  formatUptime,
  formatMemory,
  formatEnvironment,
  formatSystemStatus,
};
