import mongoose from "mongoose";

export const dbConnect = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.DATABASE_URI!);
    // await mongoose.connect(
    //   `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.yjwj9pa.mongodb.net/?retryWrites=true&w=majority`
    // );
  } catch (err) {
    console.log(err);
  }
};
