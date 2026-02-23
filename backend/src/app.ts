// src/app.ts

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import compression from "compression"
import mongoSanitize from "express-mongo-sanitize"
import xssClean from "xss-clean"
import cookieParser from "cookie-parser"
import rateLimit from "express-rate-limit"

import routes from "./routes"
import { notFound } from "./middlewares/notFound.middleware"
import { errorHandler } from "./middlewares/error.middleware"

const app = express()

// ===============================
// Security Middlewares
// ===============================

app.use(helmet())

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

// Prevent NoSQL injection
app.use(mongoSanitize())

// Prevent XSS attacks
app.use(xssClean())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests from this IP, please try again later.",
})
app.use(limiter)

// ===============================
// Body Parsing
// ===============================

app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// ===============================
// Logging (Dev Only)
// ===============================

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// ===============================
// Compression
// ===============================

app.use(compression())

// ===============================
// Routes
// ===============================

app.use("/api/v1", routes)

// ===============================
// Error Handling
// ===============================

app.use(notFound)
app.use(errorHandler)

export default app