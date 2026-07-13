const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getDashboardStats,
  deleteUser,
  updateUserRole
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/stats", protect, adminOnly, getDashboardStats);
router.delete("/users/:userId", protect, adminOnly, deleteUser);
router.put("/users/:userId/role", protect, adminOnly, updateUserRole);

module.exports = router;