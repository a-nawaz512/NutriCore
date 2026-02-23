// src/server.ts

import mongoose from "mongoose"
import app from "./app"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 5000

// ===============================
// Uncaught Exception Handling
// ===============================

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...")
  console.error(err.name, err.message)
  process.exit(1)
})

// ===============================
// Database Connection
// ===============================

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected ✅")

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`)
    })

    // ===============================
    // Unhandled Rejection Handling
    // ===============================

    process.on("unhandledRejection", (err: any) => {
      console.error("UNHANDLED REJECTION! 💥 Shutting down...")
      console.error(err.name, err.message)
      server.close(() => {
        process.exit(1)
      })
    })

    // ===============================
    // Graceful Shutdown (SIGTERM)
    // ===============================

    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Shutting down gracefully.")
      server.close(() => {
        console.log("Process terminated.")
      })
    })
  })
  .catch((err) => {
    console.error("DB Connection Failed ❌")
    console.error(err)
    process.exit(1)
  })