const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getDashboardStats,
  deleteUser,
  updateUserRole,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
router.get("/test", (req, res) => {
  res.json({
    message: "Admin Routes Working",
  });
});
router.get("/users", protect, getAllUsers);
router.get("/stats", (req, res) => {
  res.json({
    message: "Stats Route Working",
  });
});

router.delete("/users/:userId", protect, deleteUser);
router.put("/users/:userId/role", protect, updateUserRole);

module.exports = router;