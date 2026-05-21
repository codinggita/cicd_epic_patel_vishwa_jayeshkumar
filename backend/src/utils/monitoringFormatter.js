/**
 * Monitoring Formatter Utility
 *
 * Provides reusable functions to format monitoring responses.
 * Ensures consistent output structure across monitoring endpoints.
 */

/**
 * Formats uptime response with human-readable duration.
 *
 * @param {Number} uptimeSeconds - Uptime in seconds
 * @returns {Object} - Formatted uptime response
 */
const formatUptime = (uptimeSeconds) => {
  const days = Math.floor(uptimeSeconds / (24 * 60 * 60));
  const hours = Math.floor((uptimeSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((uptimeSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);

  return {
    uptimeSeconds,
    uptimeFormatted: {
      days,
      hours,
      minutes,
      seconds,
    },
    timestamp: new Date().toISOString(),
  };
};

/**
 * Formats CPU usage response with usage percentage.
 *
 * @param {Object} cpuInfo - CPU usage information
 * @returns {Object} - Formatted CPU response
 */
const formatCpuUsage = (cpuInfo) => {
  return {
    ...cpuInfo,
    timestamp: new Date().toISOString(),
    note: "Basic CPU usage information from Node.js process",
  };
};

/**
 * Formats memory usage response with human-readable values.
 *
 * @param {Object} memoryInfo - Memory usage information
 * @returns {Object} - Formatted memory response
 */
const formatMemoryUsage = (memoryInfo) => {
  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return {
    heapUsed: formatBytes(memoryInfo.heapUsed),
    heapTotal: formatBytes(memoryInfo.heapTotal),
    external: formatBytes(memoryInfo.external),
    rss: formatBytes(memoryInfo.rss),
    arrayBuffers: formatBytes(memoryInfo.arrayBuffers),
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  formatUptime,
  formatCpuUsage,
  formatMemoryUsage,
};
