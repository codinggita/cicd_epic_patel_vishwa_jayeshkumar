const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const workflowRoutes = require("./workflow.routes");
const searchRoutes = require("./search.routes");

router.use("/auth", authRoutes);
router.use("/workflows", workflowRoutes);
router.use("/search", searchRoutes);

module.exports = router;
