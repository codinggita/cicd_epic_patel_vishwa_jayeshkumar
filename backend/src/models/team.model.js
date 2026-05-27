const mongoose = require("mongoose");
const { TEAM_DEFAULTS, VISIBILITY_OPTIONS } = require("../constants/team.constants");

/**
 * Team Schema
 *
 * Represents a team collaboration group in the database.
 * Tracks team information and member relationships.
 */
const teamSchema = new mongoose.Schema(
  {
    // Name of the team
    teamName: {
      type: String,
      required: true,
      trim: true,
    },

    // Description of the team
    description: {
      type: String,
      trim: true,
      default: TEAM_DEFAULTS.DESCRIPTION,
    },

    // Reference to the user who owns the team
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Array of team member references
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Team visibility (private or public)
    visibility: {
      type: String,
      enum: Object.values(VISIBILITY_OPTIONS),
      default: TEAM_DEFAULTS.VISIBILITY,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
