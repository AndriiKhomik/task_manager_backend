require("dotenv").config();
require("express-async-errors");
// const corsOptions = require("./config/corsOptions");
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { MongooseError } from "mongoose";

import { boardRoute, cardRoute } from "./routes";
import { dbConnect } from "./config/dbConnect";

const PORT = process.env.PORT || 8000;

const app = express();

dbConnect();

app.use(
  cors({
    origin: "https://task-manager-fv49.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// app.use(cors(corsOptions));

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/board", boardRoute);
app.use("/card", cardRoute);

app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err: MongooseError) => {
  console.log(err);
});
