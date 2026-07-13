const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const freelancerRoutes = require("./routes/freelancerRoutes");
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/freelancers", freelancerRoutes);
app.get("/", (req, res) => {
    res.send("SkillSphere Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});