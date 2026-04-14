import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
import planRoutes from "./routes/planRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";


app.use("/api/plans", planRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/testimonials", testimonialRoutes);


// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ CONNECT MONGODB ATLAS
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.log("❌ MONGO ERROR:", err.message));// server

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});