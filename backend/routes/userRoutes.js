const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAllUsers);
router.get("/profile", protect, getProfile);
router.delete("/:id", protect, deleteUser);
router.put("/profile", protect, updateProfile);

module.exports = router;