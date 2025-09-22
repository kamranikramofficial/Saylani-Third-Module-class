const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database.js");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("API is running..."));

app.use("/auth", authRoutes);     
app.use("/products", productRoutes);


connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("DB connection error:", err));
