const Project = require("../models/Project");

// Create Project
const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
      status: req.body.status || "Open",
    });

    res.status(201).json({
      message: "Project Created Successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Projects of Logged-in User
const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user.id
    });

    res.json({
      count: projects.length,
      projects
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.budget = req.body.budget || project.budget;
    project.status = req.body.status || project.status;

    const updatedProject = await project.save();

    res.json({
      message: "Project Updated Successfully",
      project: updatedProject,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await Project.deleteOne({
      _id: req.params.id,
    });

    res.json({
      message: "Project Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
};