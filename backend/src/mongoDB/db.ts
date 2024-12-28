import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/locationapp`);
  } catch (error) {
    console.log(error);
  }
}
