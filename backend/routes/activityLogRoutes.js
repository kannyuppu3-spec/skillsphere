const express = require("express");

const router = express.Router();

const { getActivityLogs } = require("../controllers/activityLogController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// Get all activity logs (Admin only)
router.get("/", protect, adminOnly, getActivityLogs);

module.exports = router;