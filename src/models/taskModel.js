const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
            minlength: [3, "Task title must be at least 3 characters"],
            maxlength: [100, "Task title cannot exceed 100 characters"]
        },

        description: {
            type: String,
            required: [true, "Task description is required"],
            trim: true,
            minlength: [5, "Task description must be at least 5 characters"],
            maxlength: [500, "Task description cannot exceed 500 characters"]
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },

        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending"
        },

        dueDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);