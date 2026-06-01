const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const workflowRoutes = require("./workflow.routes");
const datasetRoutes = require("./dataset.routes");

// Register essential routes
router.use("/auth", authRoutes);
router.use("/workflows", workflowRoutes);
router.use("/dataset", datasetRoutes);

module.exports = router;
