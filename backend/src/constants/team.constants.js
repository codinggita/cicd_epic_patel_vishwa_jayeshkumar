/**
 * Team Constants
 *
 * Centralizes all static values used across the team module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for team operations
const TEAM_MESSAGES = {
  CREATED: "Team created successfully",
  FETCHED: "Teams fetched successfully",
  MEMBER_ADDED: "Team member added successfully",
  NOT_FOUND: "Team not found",
  ALREADY_MEMBER: "User is already a team member",
  NOT_OWNER: "Only team owner can add members",
};

// Visibility options for teams
const VISIBILITY_OPTIONS = {
  PRIVATE: "private",
  PUBLIC: "public",
};

// Default team values
const TEAM_DEFAULTS = {
  DESCRIPTION: "",
  VISIBILITY: VISIBILITY_OPTIONS.PRIVATE,
};

module.exports = {
  TEAM_MESSAGES,
  VISIBILITY_OPTIONS,
  TEAM_DEFAULTS,
};
