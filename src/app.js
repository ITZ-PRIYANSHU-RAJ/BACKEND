import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.Routes.js"
import authProfile from "./routes/auth.profile.js"
import userRoutes from "./routes/userRoutes.js"
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authProfile);
app.use("/api/profile",authProfile);
app.use("/api/users",userRoutes);

export default app;