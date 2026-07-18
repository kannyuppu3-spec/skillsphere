const ActivityLog = require("../models/ActivityLog");

const logActivity = async (performedBy, action, description) => {
  console.log("Logging Activity...");

  try {
    const log = await ActivityLog.create({
      performedBy,
      action,
      description,
    });

    console.log("Activity Saved:", log);
  } catch (error) {
    console.error("Activity Log Error:", error.message);
  }
};

module.exports = logActivity;