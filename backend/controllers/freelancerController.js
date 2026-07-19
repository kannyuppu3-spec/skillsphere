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

const getProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    profile.title = req.body.title || profile.title;
    profile.skills = req.body.skills || profile.skills;
    profile.bio = req.body.bio || profile.bio;
    profile.hourlyRate = req.body.hourlyRate || profile.hourlyRate;

    const updatedProfile = await profile.save();

    res.json({
      message: "Profile Updated Successfully",
      profile: updatedProfile,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOne({
      user: req.user.id
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    await FreelancerProfile.deleteOne({
      user: req.user.id
    });

    res.json({
      message: "Profile Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};