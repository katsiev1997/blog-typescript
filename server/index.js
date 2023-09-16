import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
dotenv.config();
const port = process.env.PORT;

mongoose
  .connect(process.env.DB_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", authRoute);

app.listen(port, () => {
  console.log("Server started on port: ", port);
});
