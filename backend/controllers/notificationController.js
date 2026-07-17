const Notification = require("../models/Notification");

// Create Notification
const createNotification = async (req, res) => {
  try {
    const { receiver, title, message } = req.body;

    const notification = await Notification.create({
      receiver,
      sender: req.user.id,
      title,
      message,
    });

    res.status(201).json({
      message: "Notification Created Successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Notifications
const getNotifications = async (req, res) => {
  try {
    console.log("Logged In User ID:", req.user.id);

    // Show every notification in the database
    const allNotifications = await Notification.find();

    console.log("ALL Notifications:");
    console.log(allNotifications);

    // Query for this user
    const notifications = await Notification.find({
      receiver: req.user.id,
    });

    console.log("MATCHED Notifications:");
    console.log(notifications);

    res.json({
      count: notifications.length,
      notifications,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
// Mark Notification as Read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
};