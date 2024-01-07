require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import path from "path";

import { MongooseError } from "mongoose";
import { dbConnect } from "./config/dbConnect";

const PORT = process.env.PORT || 3000;

const app = express();

dbConnect();

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err: MongooseError) => {
  console.log(err);
});
