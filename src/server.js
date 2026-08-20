require("dns").setServers(["8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TaskFlow API is running"
    });
});

app.use("/api/tasks", taskRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`TaskFlow API running on http://localhost:${PORT}`);
});