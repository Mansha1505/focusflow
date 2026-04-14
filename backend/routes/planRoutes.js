import express from "express";
import Plan from "../models/Plan.js";

const router = express.Router();

// 🔷 GET ALL PLANS (USER-SPECIFIC)
router.get("/", async (req, res) => {
  try {
    const { user } = req.query;

    const plans = await Plan.find({ user }).sort({ createdAt: -1 });

    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

// 🔷 ADD PLAN (UPDATED)
router.post("/", async (req, res) => {
  try {
    const { text, date, time, user } = req.body;

    if (!user) {
      return res.status(400).json({ error: "User ID missing" });
    }

    const newPlan = new Plan({
      text,
      date,
      time, // ✅ NEW
      user,
      isCompleted: false, // ✅ NEW
    });

    const saved = await newPlan.save();

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to add plan" });
  }
});

// 🔷 UPDATE PLAN (TOGGLE COMPLETE + FUTURE SUPPORT)
router.put("/:id", async (req, res) => {
  try {
    const updateData = {};

    if (req.body.isCompleted !== undefined) {
      updateData.isCompleted = req.body.isCompleted;
    }

    if (req.body.text !== undefined) {
      updateData.text = req.body.text;
    }

    if (req.body.date !== undefined) {
      updateData.date = req.body.date;
    }

    if (req.body.time !== undefined) {
      updateData.time = req.body.time;
    }

    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    res.json(updatedPlan);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// 🔷 DELETE PLAN
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Plan.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Plan not found" });
    }

    res.json({ message: "Plan deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;