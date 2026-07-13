const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getConversation,
  getInbox,
  markAsRead
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.post("/send", protect, sendMessage);
router.get("/conversation/:userId", protect, getConversation);
router.get("/inbox", protect, getInbox);
router.put("/:id/read", protect, markAsRead);

module.exports = router;