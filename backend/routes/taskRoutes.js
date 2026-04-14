import express from "express";
import Task from "../models/Task.js";

const router = express.Router();


// 🔷 GET ALL TASKS
router.get("/", async (req, res) => {
  try {
    const { user } = req.query;

    if (!user) {
      return res.status(400).json({ error: "User ID required" });
    }

    const tasks = await Task.find({ user }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});


// 🔷 ADD TASK (UPDATED WITH PRIORITY)
router.post("/", async (req, res) => {
  try {
    const { text, priority, user } = req.body;

    if (!user) {
      return res.status(400).json({ error: "User ID missing" });
    }

    const newTask = new Task({
      text,
      priority: priority || "medium",
      isCompleted: false,
      user, // ✅ NOW SAVED
    });

    const savedTask = await newTask.save();

    res.json(savedTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add task" });
  }
});

   


// 🔷 UPDATE TASK (TOGGLE + FUTURE SUPPORT)
router.put("/:id", async (req, res) => {
  try {
    console.log("PUT HIT:", req.params.id, req.body);

    const updateData = {};

    // allow multiple updates
    if (req.body.isCompleted !== undefined) {
      updateData.isCompleted = req.body.isCompleted;
    }

    if (req.body.priority !== undefined) {
      updateData.priority = req.body.priority;
    }

    if (req.body.text !== undefined) {
      updateData.text = req.body.text;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Update failed" });
  }
});


// 🔷 DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed" });
  }
});


export default router;