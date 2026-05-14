const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const workflowRoutes = require("./workflow.routes");

router.use("/auth", authRoutes);
router.use("/workflows", workflowRoutes);

module.exports = router;
