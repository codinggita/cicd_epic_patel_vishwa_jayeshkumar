/**
 * teamFormatter.js
 *
 * Reusable utility to format raw database query results for team endpoints.
 * This guarantees a consistent JSON payload structure for the client.
 */

/**
 * Formats team data for API response.
 *
 * @param {Object} team - Raw team document from database
 * @returns {Object} - Formatted team payload
 */
const formatTeam = (team) => {
  if (!team) return null;
  return {
    id: team._id,
    teamName: team.teamName,
    description: team.description,
    owner: team.owner,
    members: team.members,
    visibility: team.visibility,
    createdAt: team.createdAt,
    updatedAt: team.updatedAt,
  };
};

/**
 * Formats array of teams for API response.
 *
 * @param {Array} teams - Array of team documents
 * @returns {Array} - Array of formatted team objects
 */
const formatTeams = (teams) => {
  if (!Array.isArray(teams)) return [];
  return teams.map((team) => formatTeam(team));
};

/**
 * Formats updated team data for API response.
 *
 * @param {Object} team - Updated team document
 * @returns {Object} - Formatted team payload
 */
const formatUpdatedTeam = (team) => {
  return formatTeam(team);
};

module.exports = {
  formatTeam,
  formatTeams,
  formatUpdatedTeam,
};
