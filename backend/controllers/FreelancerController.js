const FreelancerProfile = require("../models/FreelancerProfile");

const createProfile = async (req, res) => {
  console.log(req.body);
  try {
    const existingProfile = await FreelancerProfile.findOne({
      user: req.user.id,
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    const profile = await FreelancerProfile.create({
      user: req.user.id,
      title: req.body.title,
      skills: req.body.skills,
      bio: req.body.bio,
      hourlyRate: req.body.hourlyRate,
    });

    res.status(201).json({
      message: "Profile Created Successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProfile,
};