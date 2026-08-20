const Task = require("../models/taskModel");

const createTask = async (req, res) => {
    try {
        const { title, description, priority, status, dueDate } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            status,
            dueDate
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Invalid task ID"
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById
};