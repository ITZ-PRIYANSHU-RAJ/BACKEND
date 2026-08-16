import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.Routes.js";
import profileRoutes from "./routes/auth.profile.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

export default app;