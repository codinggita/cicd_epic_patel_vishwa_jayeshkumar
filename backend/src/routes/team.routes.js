const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  create,
  getAll,
  addMember,
} = require("../controllers/team.controller");

const router = express.Router();

// POST /api/v1/teams — Create a new team (protected)
router.post("/", protect, create);

// GET /api/v1/teams — Fetch all teams for user (protected)
router.get("/", protect, getAll);

// PATCH /api/v1/teams/:id/members — Add member to team (protected)
router.patch("/:id/members", protect, addMember);

module.exports = router;
