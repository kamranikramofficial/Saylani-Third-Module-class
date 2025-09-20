const express = require("express");
const { Product } = require("../model/product");
const { userAuth } = require("../middleware/user");

const router = express.Router();

// Add Product
router.post("/addProduct", userAuth, async (req, res) => {
  const { firstName } = req.user;
  try {
    const { name, price, inStock } = req.body;

    const newProduct = new Product({
      name,
      price,
      inStock,
      addedBy: firstName,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      addedBy: firstName,
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
});

// Update Product
router.put("/updateProduct/:id", userAuth, async (req, res) => {
  const { firstName } = req.user;
  try {
    const { id } = req.params;
    const { name, price, inStock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, inStock, updatedBy: firstName },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      updatedBy: firstName,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
});

// Delete Product
router.delete("/deleteProduct/:id", userAuth, async (req, res) => {
  const { firstName } = req.user;
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
      deletedBy: firstName,
      data: deletedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
});

// Get Product List
router.get("/product", userAuth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      message: "Product list fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching product list",
      error: error.message,
    });
  }
});

module.exports = router;
