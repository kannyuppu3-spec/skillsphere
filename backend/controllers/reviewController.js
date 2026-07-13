const Review = require("../models/Review");
const User = require("../models/User");

// Submit Review
const submitReview = async (req, res) => {
  try {
    const { freelancer, rating, comment } = req.body;

    // Check if freelancer exists
    const user = await User.findById(freelancer);

    if (!user) {
      return res.status(404).json({
        message: "Freelancer not found",
      });
    }

    // Create review
    const review = await Review.create({
      reviewer: req.user.id,
      freelancer,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review Submitted Successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Reviews for a Freelancer
const getFreelancerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      freelancer: req.params.freelancerId,
    })
      .populate("reviewer", "name email")
      .sort({ createdAt: -1 });

    res.json({
      count: reviews.length,
      reviews,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Average Rating
const getAverageRating = async (req, res) => {
  try {
    const freelancerId = req.params.freelancerId;

    const reviews = await Review.find({
      freelancer: freelancerId,
    });

    if (reviews.length === 0) {
      return res.json({
        averageRating: 0,
        totalReviews: 0,
      });
    }

    const total = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const average = total / reviews.length;

    res.json({
      averageRating: average.toFixed(1),
      totalReviews: reviews.length,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const user = await User.findById(freelancer);

if (!user) {
  return res.status(404).json({
    message: "Freelancer not found",
  });
}

// Prevent duplicate reviews
const existingReview = await Review.findOne({
  reviewer: req.user.id,
  freelancer,
});

if (existingReview) {
  return res.status(400).json({
    message: "You have already reviewed this freelancer",
  });
}

// Create review
const review = await Review.create({
  reviewer: req.user.id,
  freelancer,
  rating,
  comment,
});
module.exports = {
  submitReview,
  getFreelancerReviews,
  getAverageRating,
};