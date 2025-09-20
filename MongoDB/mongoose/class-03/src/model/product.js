const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000,
    },
    imageUrl: {
      type: String,
      validate: {
        validator: v => validator.isURL(v, { protocols: ["http", "https"], require_protocol: true }),
        message: "Invalid image URL",
      },
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
