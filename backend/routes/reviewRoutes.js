const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => {
  res.json({
    message: "Review Route Working"
  });
});
const {
  submitReview,
  getFreelancerReviews,
  getAverageRating,
  getMyReviews,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, submitReview);
router.get("/my", protect, getMyReviews);
router.get("/average/:freelancerId", getAverageRating);

router.get("/:freelancerId", getFreelancerReviews);
module.exports = router;