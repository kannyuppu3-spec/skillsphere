const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);

    const users = await mongoose.connection.db
      .collection("users")
      .find({})
      .toArray();

    console.log("Users in DB:", users);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;