const os = require("os");
const {
  formatUptime,
  formatCpuUsage,
  formatMemoryUsage,
} = require("../utils/monitoringFormatter");

/**
 * Fetches server uptime information.
 *
 * @returns {Object} - Formatted uptime response
 */
const getUptime = async () => {
  const uptimeSeconds = process.uptime();
  const formatted = formatUptime(uptimeSeconds);
  return formatted;
};

/**
 * Fetches CPU usage information.
 *
 * @returns {Object} - Formatted CPU usage response
 */
const getCpuUsage = async () => {
  const cpuInfo = {
    platform: os.platform(),
    arch: os.arch(),
    cpuCount: os.cpus().length,
    cpuModel: os.cpus()[0].model,
    loadAverage: os.loadavg(),
    nodeVersion: process.version,
  };

  const formatted = formatCpuUsage(cpuInfo);
  return formatted;
};

/**
 * Fetches memory usage information.
 *
 * @returns {Object} - Formatted memory usage response
 */
const getMemoryUsage = async () => {
  const memoryInfo = process.memoryUsage();
  const formatted = formatMemoryUsage(memoryInfo);
  return formatted;
};

module.exports = {
  getUptime,
  getCpuUsage,
  getMemoryUsage,
};
