const Message = require("../models/Message");
const User = require("../models/User");

// Send Message
const sendMessage = async (req, res) => {
  try {
    console.log("Logged in user:", req.user.id);
    console.log("Body:", req.body);

    const { receiver, message } = req.body;

    console.log("Receiver:", receiver);

    const user = await User.findById(receiver);

    console.log("Found User:", user);

    if (!user) {
      return res.status(404).json({
        message: "Receiver not found",
      });
    }

    const newMessage = await Message.create({
      sender: req.user.id,
      receiver,
      message,
    });

    res.status(201).json(newMessage);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
// Get Conversation
const getConversation = async (req, res) => {
  try {
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        {
          sender: req.user.id,
          receiver: otherUserId,
        },
        {
          sender: otherUserId,
          receiver: req.user.id,
        },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name email")
      .populate("receiver", "name email");

    res.json({
      count: messages.length,
      messages,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Inbox
const getInbox = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id }
      ]
    })
      .sort({ createdAt: -1 })
      .populate("sender", "name email")
      .populate("receiver", "name email");

    res.json({
      count: messages.length,
      messages,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Mark Message as Read
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    message.isRead = true;

    await message.save();

    res.json({
      message: "Message marked as read",
      messageData: message,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  sendMessage,
  getConversation,
  getInbox,
  markAsRead,
};