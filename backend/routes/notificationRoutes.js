const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Notification Route Working",
  });
});

const {
  createNotification,
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createNotification);
router.get("/", protect, getNotifications);
router.put("/:id/read", protect, markAsRead);

module.exports = router;