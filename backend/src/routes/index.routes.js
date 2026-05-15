const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const workflowQueryRoutes = require("./workflowQuery.routes"); // named query endpoints — must come before workflowRoutes
const workflowRoutes = require("./workflow.routes");
const searchRoutes = require("./search.routes");
const { workflowBookmarkRouter, bookmarkRouter } = require("./bookmark.routes");

router.use("/auth", authRoutes);
router.use("/workflows", workflowQueryRoutes);       // /latest, /popular, /recommended, /trending
router.use("/workflows", workflowBookmarkRouter);    // /:id/bookmark  (POST, DELETE)
router.use("/workflows", workflowRoutes);            // /, /:id (CRUD)
router.use("/bookmarks", bookmarkRouter);            // /bookmarks (GET)
router.use("/search", searchRoutes);

module.exports = router;
