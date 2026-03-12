// backend/src/utils/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import "dotenv/config"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary via stream
 */
export const uploadToCloudinary = (fileBuffer: Buffer, folderName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName, // e.g., "products"
        resource_type: "auto",
      },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );

    // Stream the buffer to Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};