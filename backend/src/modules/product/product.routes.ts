// backend/src/modules/product/product.route.ts
import { Router } from "express";
import { 
  createProduct, 
  getAllProducts, 
  getSingleProduct, 
  updateProduct, 
  deleteProduct 
} from "./product.controller.js";
import { uploadImages } from "../../middlewares/upload.middleware.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "./product.validation.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);


router.post(
  "/",
  uploadImages.array("images", 5),
  validateRequest(createProductSchema),
  createProduct
);

router.patch(
  "/:id",
  uploadImages.array("images", 5), 
  validateRequest(updateProductSchema),
  updateProduct
);

router.delete(
  "/:id",
  // No body validation needed for a delete request
  deleteProduct
);

export default router;