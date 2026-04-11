import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // ✅ 1. Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ 2. Email format check (basic)
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // ✅ 3. Password length check
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // ✅ 4. Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 6. Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    console.log("User Created:", user._id); // 🔥 debug

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error); // 🔥 IMPORTANT
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};



// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // ✅ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error); // 🔥 IMPORTANT
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};



// ================= PROFILE =================
export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(req.user);

  } catch (error) {
    console.log("PROFILE ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};