// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
// import mongoSanitize from "express-mongo-sanitize"; // ✅ default import
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import routes from "./routes.js"; // ✅ include .js for ESModule runtime
import { notFound } from "./middlewares/notFound.middleware.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
// import xss from "xss-clean"; // ✅ default import

const app = express();
dotenv.config();
// ===============================
// Body Parsing (Must come first)
// ===============================
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===============================
// Security Middlewares
// ===============================

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// Prevent NoSQL injection
// app.use(mongoSanitize());

// Prevent XSS attacks
// app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Compression
app.use(compression());

// ===============================
// Logging (Development Only)
// ===============================
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ===============================
// Routes
// ===============================
app.use("/api/v1", routes);

// ===============================
// Error Handling
// ===============================
app.use(notFound);
app.use(globalErrorHandler);

export default app;