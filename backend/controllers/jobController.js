const Job = require("../models/Job");
const logActivity = require("../utils/activityLogger");
// Create Job
const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
      skills: req.body.skills,
      status: req.body.status || "Open",
    });
await logActivity(
  req.user.id,
  "JOB_CREATED",
  `${req.user.id} created a new job: ${job.title}`
);

    res.status(201).json({
      message: "Job Created Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Jobs
// Get All Jobs with Search, Filter, Sort & Pagination
const getAllJobs = async (req, res) => {
  try {
    const search = req.query.search || "";
    const skill = req.query.skill || "";
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "";

    let query = {};

    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by skill
    if (skill) {
      query.skills = {
        $regex: skill,
        $options: "i",
      };
    }

    let sortOption = {};

    if (sort === "budget") {
      sortOption.budget = -1;
    }

    if (sort === "latest") {
      sortOption.createdAt = -1;
    }

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate("user", "name email")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
      jobs,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Single Job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("user", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json(job);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// Update Job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    job.title = req.body.title || job.title;
    job.description = req.body.description || job.description;
    job.budget = req.body.budget || job.budget;
    job.skills = req.body.skills || job.skills;
    job.status = req.body.status || job.status;

    const updatedJob = await job.save();

    res.json({
      message: "Job Updated Successfully",
      job: updatedJob,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    await Job.deleteOne({
      _id: req.params.id,
    });

    res.json({
      message: "Job Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Logged-in Client Jobs
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user.id,
    });

    res.json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
};