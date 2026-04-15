import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("REGISTER:", req.body);

    // ✅ Only email & password required
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // ✅ Normalize email
    const lowerEmail = email.toLowerCase();

    // ✅ Check existing user
    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = new User({
      email: lowerEmail,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN:", req.body);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const lowerEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerEmail });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, "mysecret123");

    res.json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;