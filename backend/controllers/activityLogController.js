const ActivityLog = require("../models/ActivityLog");

// Get All Activity Logs
const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("performedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      count: logs.length,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getActivityLogs,
};