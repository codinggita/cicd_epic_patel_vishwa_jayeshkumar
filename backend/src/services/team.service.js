const Team = require("../models/team.model");
const { TEAM_MESSAGES } = require("../config/constants");
const teamConfig = require("../config/team.config");

/**
 * Creates a new team.
 *
 * @param {Object} teamData - Team data from request body
 * @param {String} ownerId - ID of the user creating the team
 * @returns {Object} - Newly created team document
 */
const createTeam = async (teamData, ownerId) => {
  const { teamName, description, visibility } = teamData;

  const team = await Team.create({
    teamName,
    description: description || teamConfig.defaultDescription,
    owner: ownerId,
    members: [ownerId], // Owner is automatically a member
    visibility: visibility || teamConfig.defaultVisibility,
  });

  return team;
};

/**
 * Fetches all teams for a user (teams they own or are members of).
 *
 * @param {String} userId - User ID
 * @returns {Array} - Array of team documents
 */
const getUserTeams = async (userId) => {
  const teams = await Team.find({
    $or: [{ owner: userId }, { members: userId }],
  })
    .populate("owner", "name email")
    .populate("members", "name email")
    .sort({ createdAt: -1 });

  return teams;
};

/**
 * Adds a member to a team.
 *
 * @param {String} teamId - Team ID
 * @param {String} memberId - User ID to add as member
 * @param {String} requesterId - ID of the user making the request
 * @returns {Object} - Updated team document
 */
const addTeamMember = async (teamId, memberId, requesterId) => {
  // Find the team
  const team = await Team.findById(teamId);
  if (!team) {
    const error = new Error(TEAM_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Check if requester is the owner
  if (team.owner.toString() !== requesterId) {
    const error = new Error(TEAM_MESSAGES.NOT_OWNER);
    error.statusCode = 403;
    throw error;
  }

  // Check if user is already a member
  if (team.members.includes(memberId)) {
    const error = new Error(TEAM_MESSAGES.ALREADY_MEMBER);
    error.statusCode = 400;
    throw error;
  }

  // Add member to team
  team.members.push(memberId);
  await team.save();

  return team;
};

module.exports = {
  createTeam,
  getUserTeams,
  addTeamMember,
};
