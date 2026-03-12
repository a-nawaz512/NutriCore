// backend/src/modules/product/product.controller.ts
import { Request, Response } from "express";
import { catchAsync } from "../../utils/asyncHandler.js";
import Product from "./product.model.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";

export const createProduct = catchAsync(async (req: Request, res: Response) => {


  console.log("REQ BODY", req.body)
  console.log("TYPE", typeof req.body.supplementQuantityOptions)
  const productData = req.body;
  const files = req.files as Express.Multer.File[];

  let imageUrls: string[] = [];

  // 1. Upload Images to Cloudinary if files exist
  if (files && files.length > 0) {
    // Map each file to our upload promise
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file.buffer, "stylogist_products")
    );

    // Wait for all uploads to finish concurrently
    imageUrls = await Promise.all(uploadPromises);
  }

  let supplementQuantityOptions: number[] = [];

    try {
      if (typeof req.body.supplementQuantityOptions === "string") {
        const parsed = JSON.parse(req.body.supplementQuantityOptions);

        if (!Array.isArray(parsed)) {
          throw new Error("supplementQuantityOptions must be an array");
        }

        // Ensure all items are numbers
        supplementQuantityOptions = parsed.map(Number);
      } else if (Array.isArray(req.body.supplementQuantityOptions)) {
        // if somehow it's already an array (e.g., repeated form-data keys)
        supplementQuantityOptions = req.body.supplementQuantityOptions.map(Number);
      }
    } catch (err) {
      console.error("Error parsing supplementQuantityOptions:", err);
      return res.status(400).json({ success: false, message: "Invalid supplementQuantityOptions" });
    }

    const bodyWithParsedArray = { ...productData, supplementQuantityOptions };

  // 2. Save to Database
  const newProduct = await Product.create({
    ...bodyWithParsedArray ,
    images: imageUrls, // Save the secure Cloudinary URLs to MongoDB
  });

  // 3. Send Response
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct,
  });
});


export const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const { search, category, page = 1, limit = 10 } = req.query;

  // Build the query object dynamically
  const query: any = {};
  
  if (search) {
    query.name = { $regex: search as string, $options: "i" }; // Case-insensitive search
  }
  if (category) {
    query.category = category;
  }

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute query
  const products = await Product.find(query)
    .sort({ createdAt: -1 }) // Newest first
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
    data: products,
  });
});

// ==========================================
// GET SINGLE PRODUCT
// ==========================================
export const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: product,
  });
});

// ==========================================
// UPDATE PRODUCT
// ==========================================
export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const files = req.files as Express.Multer.File[];

  // 1. Check if product exists
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  // 2. Handle new image uploads (if any)
  let newImageUrls: string[] = [];
  if (files && files.length > 0) {
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file.buffer, "stylogist_products")
    );
    newImageUrls = await Promise.all(uploadPromises);
  }

  // 3. Parse array fields if they were sent as strings via FormData
  const arrayFields = ['supplementQuantityOptions', 'healthBenefits', 'ingredients'];
  arrayFields.forEach(field => {
    if (typeof updateData[field] === "string") {
      try {
        const parsed = JSON.parse(updateData[field]);
        updateData[field] = Array.isArray(parsed) ? parsed : [];
      } catch (err) {
        updateData[field] = [];
      }
    }
  });

  // Combine existing images with new ones (or you can overwrite entirely based on your UI needs)
  if (newImageUrls.length > 0) {
    updateData.images = [...existingProduct.images, ...newImageUrls];
  }

  // 4. Update Database
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure mongoose schema rules are applied
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

// ==========================================
// DELETE PRODUCT
// ==========================================
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  // 1. Delete associated images from Cloudinary
  // if (product.images && product.images.length > 0) {
  //   const deletePromises = product.images.map((url) => deleteFromCloudinary(url));
  //   await Promise.all(deletePromises);
  // }

  // 2. Delete from Database
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
});