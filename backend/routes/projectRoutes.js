const express = require("express");

const router = express.Router();

const {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const {
  protect
} = require("../middleware/authMiddleware");

router.post("/create", protect, createProject);
router.get("/", protect, getMyProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
module.exports = router;