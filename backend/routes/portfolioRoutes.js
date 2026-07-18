const express = require("express");
const router = express.Router();

const {
  addProject,
  getMyProjects,
  updateProject,
  deleteProject,
} = require("../controllers/portfolioController");

const { protect } = require("../middleware/authMiddleware");

// Add Project
router.post("/", protect, addProject);

// Get My Portfolio
router.get("/my", protect, getMyProjects);

// Update Project
router.put("/:id", protect, updateProject);

// Delete Project
router.delete("/:id", protect, deleteProject);

module.exports = router;