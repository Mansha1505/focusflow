import express from "express";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  const data = await Testimonial.find().sort({ createdAt: -1 });
  res.json(data);
});

// ADD
router.post("/", async (req, res) => {
  const { name, message, rating } = req.body;

  const newTestimonial = new Testimonial({
    name,
    message,
    rating,
  });

  const saved = await newTestimonial.save();
  res.json(saved);
});

export default router;