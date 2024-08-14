import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

// APP
export const app = express();
// BODY PARSER
app.use(express.json({ limit: "50mb" }));
// COOKIE PARSER
app.use(cookieParser());
// CORS [CROSS ORIGIN RESOURCE SHARING]
app.use(cors());
// ROUTES
import userRouter from "./routes/user.route.js";
import classRoomRouter from "./routes/classroom.route.js";
app.use("/api/v1", userRouter);
app.use("/api/v1", classRoomRouter);

// TESTING API
app.get("/", (req, res) =>
  res.status(200).json({ success: true, message: "API is working" })
);

// UNKNOWN ROUTE
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found!`);
  err.statusCode = 404;
  next(err);
});

// SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is connected with port ${process.env.PORT}`);
  connectDB();
});
