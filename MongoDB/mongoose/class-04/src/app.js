const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database.js");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// ----- Middlewares -----
app.use(express.json()); // must come before routes
app.use(cookieParser());

// Simple health check
app.get("/", (req, res) => res.send("API is running..."));

// ----- Routes -----
app.use("/auth", authRoutes);       // -> /auth/signup, /auth/login, etc.
app.use("/products", productRoutes);

// ----- Connect to DB & start server -----
connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("DB connection error:", err));
