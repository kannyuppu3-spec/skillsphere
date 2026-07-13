const express = require("express");

const router = express.Router();

const {
  applyToJob,
  getMyProposals,
  getJobProposals,
  updateProposalStatus
} = require("../controllers/proposalController");
const { protect } = require("../middleware/authMiddleware");

router.post("/apply", protect, applyToJob);
router.get("/my", protect, getMyProposals);
router.get("/job/:jobId", protect,getJobProposals);
router.put("/:id/status", protect,updateProposalStatus);

module.exports = router;