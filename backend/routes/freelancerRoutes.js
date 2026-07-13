const express = require("express");

const router = express.Router();

const { createProfile } = require("../controllers/freelancerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createProfile);

module.exports = router;
