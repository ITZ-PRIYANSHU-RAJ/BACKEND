import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.Routes.js";
import profileRoutes from "./routes/auth.profile.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);

export default app;