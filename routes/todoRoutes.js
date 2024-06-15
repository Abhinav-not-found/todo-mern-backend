const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel'); // Assuming your model is Todo

router.get('/', async (req, res) => {
    try {
        const allTasks = await Todo.find();
        if (!allTasks || allTasks.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }
        res.status(200).json({ message: "Tasks fetched successfully", allTasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.post('/', async (req, res) => {
    try {
        const { task } = req.body;
        const newTask = new Todo({ task, completed: false }); // Assuming 'completed' defaults to false
        const savedTask = await newTask.save();
        res.status(201).json({ message: "Task saved successfully", task: savedTask });
    } catch (error) {
        console.error("Error saving task:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Todo.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.completed = !task.completed; // Toggle completion status
        await task.save();
        res.status(200).json({ message: "Task updated successfully", updatedTask: task });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Todo.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
router.put('/edit/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { task } = req.body;
        const updatedTask = await Todo.findByIdAndUpdate(taskId, { task }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

module.exports = router;
