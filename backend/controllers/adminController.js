const User = require("../models/User");
const Job = require("../models/Job");
const Project = require("../models/Project");
const Proposal = require("../models/Proposal");
const Review = require("../models/Review");


// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const freelancers = await User.countDocuments({
      role: "freelancer",
    });
    const clients = await User.countDocuments({
      role: "client",
    });

    const totalJobs = await Job.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalProposals = await Proposal.countDocuments();
    const totalReviews = await Review.countDocuments();

    res.json({
      totalUsers,
      freelancers,
      clients,
      totalJobs,
      totalProjects,
      totalProposals,
      totalReviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update User Role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    res.json({
      message: "User role updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllUsers,
  getDashboardStats,
  deleteUser,
  updateUserRole,
};