const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const activityRoutes = require("./activity.routes");
const dashboardRoutes = require("./dashboard.routes");
const infraRoutes = require("./infra.routes");
const notificationRoutes = require("./notification.routes");
const preferencesRoutes = require("./preferences.routes");

const teamRoutes = require("./team.routes");
const userRoutes = require("./user.routes");
const workflowRoutes = require("./workflow.routes");

// Register essential routes
router.use("/auth", authRoutes);
router.use("/activity", activityRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/infra", infraRoutes);
router.use("/notifications", notificationRoutes);
router.use("/preferences", preferencesRoutes);

router.use("/team", teamRoutes);
router.use("/users", userRoutes);
router.use("/workflows", workflowRoutes);

module.exports = router;
