const { TEAM_DEFAULTS, VISIBILITY_OPTIONS } = require("../config/constants");

const teamConfig = {
  defaultDescription: TEAM_DEFAULTS.DESCRIPTION,
  defaultVisibility: TEAM_DEFAULTS.VISIBILITY,
  availableVisibilities: Object.values(VISIBILITY_OPTIONS),
  maxMembersPerTeam: 50,
  updatableFields: ["description", "visibility"],
  memberUpdateFields: ["members"],
};

module.exports = teamConfig;