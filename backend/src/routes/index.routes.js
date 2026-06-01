const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const workflowRoutes = require("./workflow.routes");
const datasetRoutes = require("./dataset.routes");
const infraRoutes = require("./infra.routes");
const searchRoutes = require("./search.routes");
const yamlRoutes = require("./yaml.routes");
const analyticsRoutes = require("./analytics.routes");
const debugRoutes = require("./debug.routes");
const adminRoutes = require("./admin.routes");
const monitoringRoutes = require("./monitoring.routes");
const notificationsRoutes = require("./notifications.routes");
const systemRoutes = require("./system.routes");

// Register essential routes
router.use("/auth", authRoutes);
router.use("/workflows", workflowRoutes);
router.use("/dataset", datasetRoutes);
router.use("/infra", infraRoutes);
router.use("/search", searchRoutes);
router.use("/yaml", yamlRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/debug", debugRoutes);
router.use("/admin", adminRoutes);
router.use("/monitoring", monitoringRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/system", systemRoutes);

module.exports = router;
