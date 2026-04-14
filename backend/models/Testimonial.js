import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    message: String,
    rating: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);