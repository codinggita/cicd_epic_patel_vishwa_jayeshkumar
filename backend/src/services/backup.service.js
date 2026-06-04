const { MOCK_BACKUPS } = require("../config/constants");
const {
  formatBackupList,
  formatBackupCreated,
  formatBackupDeleted,
} = require("../utils/backupFormatter");

// In-memory storage for mock backups (for demonstration)
let backups = [...MOCK_BACKUPS];

/**
 * Fetches all backups.
 *
 * @returns {Object} - Formatted backup list response
 */
const getAllBackups = async () => {
  const formatted = formatBackupList(backups);
  return formatted;
};

/**
 * Creates a new backup record.
 *
 * @param {Object} data - Backup data from request body
 * @returns {Object} - Formatted backup creation response
 */
const createBackup = async (data) => {
  const { name, type } = data;
  const newBackup = {
    id: Date.now().toString(),
    name: name || `backup-${new Date().toISOString().split("T")[0]}`,
    type: type || "full",
    status: "completed",
    size: "0 MB",
    createdAt: new Date().toISOString(),
  };

  backups.unshift(newBackup);
  const formatted = formatBackupCreated(newBackup);
  return formatted;
};

/**
 * Deletes a backup by ID.
 *
 * @param {String} backupId - ID of the backup to delete
 * @returns {Object} - Formatted backup deletion response
 */
const deleteBackup = async (backupId) => {
  const index = backups.findIndex((b) => b.id === backupId);

  if (index === -1) {
    const error = new Error("Backup not found");
    error.statusCode = 404;
    throw error;
  }

  backups.splice(index, 1);
  const formatted = formatBackupDeleted(backupId);
  return formatted;
};

module.exports = {
  getAllBackups,
  createBackup,
  deleteBackup,
};
