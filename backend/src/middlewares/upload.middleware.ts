// backend/src/middlewares/upload.middleware.ts
import multer from "multer";
import path from "path";

// For development, we can store in memory or a local 'uploads' folder. 
// For production, you'd likely stream this to Cloudinary or AWS S3.
const storage = multer.memoryStorage(); 

export const uploadImages = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit per file
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.svg') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  }
});