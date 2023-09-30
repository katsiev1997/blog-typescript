import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose
  .connect(process.env.DB_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.use("/api", authRoute);

app.listen(port, () => {
  console.log("Server started on port: ", port);
});
