const express = require("express");

const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const {
  protect
} = require("../middleware/authMiddleware");

// Create a new job
router.post("/create", protect, createJob);

// Get all jobs
router.get("/", protect, getAllJobs);
router.get("/:id", protect, getJobById);
router.put("/:id", protect,updateJob);
router.delete("/:id", protect,deleteJob);

module.exports = router;