// backend/src/modules/product/product.model.ts
import mongoose, { Document, Schema } from "mongoose";

// 1. Define the TypeScript Interface for autocomplete and type safety
export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  supplementQuantityOptions: number[];
  healthBenefits: string[];
  ingredients: string[];
  usageInstructions?: string;
}

// 2. Create the Mongoose Schema
const productSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      // Locking this down to match your frontend <select> options perfectly
      enum: ["Vitamins", "Protein", "Omega", "Immunity", "Minerals", "Probiotics"], 
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
    },
    images: {
      type: [String], // This will store our Cloudinary secure_urls
      default: [],
    },
    supplementQuantityOptions: {
      type: [Number],
      default: [],
    },
    healthBenefits: {
      type: [String],
      default: [],
    },
    ingredients: {
      type: [String],
      default: [],
    },
    usageInstructions: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// 3. Export the Model
const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;