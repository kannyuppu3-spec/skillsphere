const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
  } catch (err) {
    console.error("MongoDB Error:");
    console.error(err);
    console.error(err.stack);
    process.exit(1);
  }
};

module.exports = connectDB;