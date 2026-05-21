/**
 * system.service.js
 *
 * Service layer for the system monitoring module.
 * Direct interactions with Node.js process and OS utilities.
 */

const os = require("os");

/**
 * Retrieves the current system uptime of the backend process.
 *
 * @returns {number} - Process uptime in seconds
 */
const getProcessUptime = () => {
  return process.uptime();
};

/**
 * Retrieves memory usage statistics of the Node.js process.
 *
 * @returns {Object} - Object containing rss, heapTotal, heapUsed, etc.
 */
const getMemoryUsage = () => {
  return process.memoryUsage();
};

/**
 * Retrieves general system information.
 *
 * @returns {Object} - Platform, release, CPU count, etc.
 */
const getSystemEnvironment = () => {
  return {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    cpus: os.cpus().length,
    freeMemory: os.freemem(),
    totalMemory: os.totalmem(),
    env: process.env.NODE_ENV || "development",
  };
};

module.exports = {
  getProcessUptime,
  getMemoryUsage,
  getSystemEnvironment,
};
