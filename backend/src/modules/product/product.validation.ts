// backend/src/modules/product/product.validation.ts
import { z } from "zod";

export const createProductSchema = z.object({
  // 🎯 CRITICAL FIX: Add the "body" wrapper here!

  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string(),
  usageInstructions: z.string().optional(),

  price: z.preprocess((val) => Number(val) || 0, z.number().positive()),
  stock: z.preprocess((val) => Number(val) || 0, z.number().int().nonnegative()),

  supplementQuantityOptions: z.preprocess((val) => {
    if (!val) return []

    // multer sometimes wraps fields in array
    const value = Array.isArray(val) ? val[0] : val

    return JSON.parse(value)
  }, z.array(z.number())),
  healthBenefits: z.preprocess((val) => {
    if (!val) return []
    const value = Array.isArray(val) ? val[0] : val
    return JSON.parse(value)
  }, z.array(z.string())),

  ingredients: z.preprocess((val) => {
    if (!val) return []
    const value = Array.isArray(val) ? val[0] : val
    return JSON.parse(value)
  }, z.array(z.string())),
})


export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    usageInstructions: z.string().optional(),
    price: z.preprocess((val) => (val ? Number(val) : undefined), z.number().positive().optional()),
    stock: z.preprocess((val) => (val ? Number(val) : undefined), z.number().int().nonnegative().optional()),
    // Arrays can skip preprocessing here since we handle the parsing safely in the controller for updates
    supplementQuantityOptions: z.any().optional(),
    healthBenefits: z.any().optional(),
    ingredients: z.any().optional(),
  }),
});