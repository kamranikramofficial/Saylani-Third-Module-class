const express = require("express");
const { connectDB } = require("./config/database");
const Product = require("./model/product");

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Create a product
app.post("/addproducts", async (req, res) => {
  console.log("Incoming body:", req.body);

  try {
    const product = await Product.create(req.body);
    console.log("Product added");
    res.status(201).json(product);
  } catch (err) {
    console.error("Failed to add product:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

connectDB()
  .then(() => {
    console.log("Database connected!");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error("Database is not connected!", err));
