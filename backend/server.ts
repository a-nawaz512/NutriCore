import dotenv from "dotenv";
// Must be called before importing app or db to ensure env vars are loaded
dotenv.config();

import { connectDB } from "./src/config/db.js"; // ESM requires the .js extension here!
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

// ===============================
// Uncaught Exception Handling
// (Must be at the very top to catch sync errors)
// ===============================
process.on("uncaughtException", (err: any) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err?.name, err?.message);
  process.exit(1);
});

// ===============================
// Initialize Server & Database
// ===============================
let server: any;

const startServer = async () => {
  // 1. Connect to Database first
  await connectDB();
  
  // 2. Start the Express server only after DB connects
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
};

startServer();

// ===============================
// Unhandled Rejection Handling
// (Catches async promise rejections outside of Express)
// ===============================
process.on("unhandledRejection", (err: any) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err?.name, err?.message);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// ===============================
// Graceful Shutdown (SIGTERM)
// (For platforms like Heroku/Render)
// ===============================
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  if (server) {
    server.close(() => {
      console.log("Process terminated.");
    });
  }
});