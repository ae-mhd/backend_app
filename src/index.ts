import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import { errorHandler } from "./middleware/errorHandler";
import AppError from "./utils/AppError";
import { connectToDatabase } from "./config/database";

connectToDatabase();
const app = express();
app.use(
  express.json({
    limit: "10mb", // Adjust the limit as needed
  })
);
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb", // Adjust the limit as needed
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);

app.all("*", (req, res, next) => {
  return next(new AppError("Route not found", 404));
});
app.use(errorHandler);
app.listen(7000, () => {
  console.log("Server started on port 7000");
});
