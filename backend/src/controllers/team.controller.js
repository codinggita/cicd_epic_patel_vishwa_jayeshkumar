const {
  createTeam,
  getUserTeams,
  addTeamMember,
} = require("../services/team.service");
const {
  formatTeam,
  formatTeams,
  formatUpdatedTeam,
} = require("../utils/teamFormatter");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../config/constants");
const { TEAM_MESSAGES } = require("../config/constants");

/**
 * POST /api/v1/teams
 * Creates a new team.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const create = asyncHandler(async (req, res) => {
  const ownerId = req.user.id;
  const team = await createTeam(req.body, ownerId);
  const formattedTeam = formatTeam(team);
  sendResponse(res, HTTP_STATUS.CREATED, TEAM_MESSAGES.CREATED, formattedTeam);
});

/**
 * GET /api/v1/teams
 * Fetches all teams for the authenticated user.
 */
const getAll = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const teams = await getUserTeams(userId);
  const formattedTeams = formatTeams(teams);
  sendResponse(res, HTTP_STATUS.OK, TEAM_MESSAGES.FETCHED, formattedTeams);
});

/**
 * PATCH /api/v1/teams/:id/members
 * Adds a member to a team.
 */
const addMember = asyncHandler(async (req, res) => {
  const { id: teamId } = req.params;
  const { memberId } = req.body;
  const requesterId = req.user.id;

  const team = await addTeamMember(teamId, memberId, requesterId);
  const formattedTeam = formatUpdatedTeam(team);
  sendResponse(res, HTTP_STATUS.OK, TEAM_MESSAGES.MEMBER_ADDED, formattedTeam);
});

module.exports = {
  create,
  getAll,
  addMember,
};
