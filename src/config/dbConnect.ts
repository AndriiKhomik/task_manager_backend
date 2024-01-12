import mongoose from "mongoose";

export const dbConnect = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.DATABASE_URI!);
  } catch (err) {
    console.log(err);
  }
};
