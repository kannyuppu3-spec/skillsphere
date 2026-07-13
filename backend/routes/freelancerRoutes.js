const express = require("express");

const router = express.Router();

const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
} = require("../controllers/freelancerController");

const {
  protect
} = require("../middleware/authMiddleware");

// Create Profile
router.post("/create", protect, createProfile);

// Get Logged-in User Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteProfile);
module.exports = router;