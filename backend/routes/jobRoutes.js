const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

// IMPORTANT: specific routes first
router.get("/my", protect, getMyJobs);

router.post("/", protect, createJob);
router.get("/", getAllJobs);

router.get("/:id", getJobById);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;