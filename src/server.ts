import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db";
import { initSocket } from "./socketServer";

import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import errorHandler from "./middlewares/errorHandler";
import eventRouter from "./routes/event.route";
import ticketRouter from "./routes/ticket.route";

connectDB();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", eventRouter);
app.use("/api", ticketRouter);

app.use(errorHandler);

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
