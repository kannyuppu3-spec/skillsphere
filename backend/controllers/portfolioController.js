const Portfolio = require("../models/Portfolio");

// Add Portfolio Project
const addProject = async (req, res) => {
  try {
    const project = await Portfolio.create({
      freelancer: req.user.id,
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies,
      github: req.body.github,
      liveDemo: req.body.liveDemo,
      image: req.body.image,
      category: req.body.category,
    });

    res.status(201).json({
      message: "Project added successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Portfolio
const getMyProjects = async (req, res) => {
  try {
    const projects = await Portfolio.find({
      freelancer: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Project
const updateProject = async (req, res) => {
  try {
    const project = await Portfolio.findOne({
      _id: req.params.id,
      freelancer: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    Object.assign(project, req.body);

    await project.save();

    res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    const project = await Portfolio.findOne({
      _id: req.params.id,
      freelancer: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProject,
  getMyProjects,
  updateProject,
  deleteProject,
};