/**
 * Team Configuration
 *
 * Centralized configuration for team module.
 * Adjust these values to change team behavior globally.
 */

const { TEAM_DEFAULTS, VISIBILITY_OPTIONS } = require("../constants/team.constants");

const teamConfig = {
  // Default description for new teams
  defaultDescription: TEAM_DEFAULTS.DESCRIPTION,

  // Default visibility for new teams
  defaultVisibility: TEAM_DEFAULTS.VISIBILITY,

  // Available visibility options
  availableVisibilities: Object.values(VISIBILITY_OPTIONS),

  // Maximum number of members per team
  maxMembersPerTeam: 50,

  // Fields that can be updated via PATCH endpoint
  updatableFields: ["description", "visibility"],

  // Fields that can be updated when adding members
  memberUpdateFields: ["members"],
};

module.exports = teamConfig;
