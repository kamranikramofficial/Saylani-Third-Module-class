const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { User } = require("../model/user");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
      throw new Error("Name is not valid!");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid!");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Please use a strong password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.cookie("token", "1234567890asdfghjkl");
    res.send({ message: "User signup successfully!", data: user });
  } catch (error) {
    res.status(400).send({ message: "Signup error!", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials!");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid credentials!");

    const token = jwt.sign({ id: user._id }, "Hadeed@4321", { expiresIn: "1d" });

    res.cookie("token", token);
    res.send("Login successful!");
  } catch (error) {
    res.status(400).send({ message: "Login error!", error: error.message });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.send("Logout successfully!");
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("Authentication invalid!");

    const decoded = jwt.verify(token, "kamran@4321");
    const user = await User.findById(decoded.id).select("-password -__v -createdAt -updatedAt");
    if (!user) throw new Error("User not found!");

    res.send({ message: "User found!", data: user });
  } catch (error) {
    res.status(400).send({ message: "Error fetching user!", error: error.message });
  }
});

module.exports = router;
