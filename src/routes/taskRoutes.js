const express = require("express");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const router = express.Router();

// CREATE
router.post("/", createTask);

// READ
router.get("/", getTasks);
router.get("/:id", getTaskById);

// UPDATE
router.put("/:id", updateTask);

// DELETE
router.delete("/:id", deleteTask);

module.exports = router;