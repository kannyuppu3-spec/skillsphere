const express = require("express");

const router = express.Router();

const {
  submitReview,
  getFreelancerReviews,
  getAverageRating
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.post("/submit", protect, submitReview);
router.get("/freelancer/:freelancerId", protect, getFreelancerReviews);
router.get("/average/:freelancerId", protect, getAverageRating);
module.exports = router;