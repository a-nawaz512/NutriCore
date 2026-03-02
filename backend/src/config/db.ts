import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // process.env.MONGO_URI should be validated, but we'll cast it for now
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
  } catch (error: any) {
    console.error("DB Connection Failed ❌");
    console.error(error?.name, error?.message);
    // Exit process with failure code if the DB doesn't connect
    process.exit(1); 
  }
};