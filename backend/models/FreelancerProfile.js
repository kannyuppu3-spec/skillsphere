const mongoose = require("mongoose");

const freelancerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    title: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    bio: {
      type: String,
      default: ""
    },

    hourlyRate: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "FreelancerProfile",
  freelancerProfileSchema
);