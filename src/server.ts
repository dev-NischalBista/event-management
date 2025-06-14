import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";
import { initSocket } from "./socketServer";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import eventRouter from "./routes/event.route";
import ticketRouter from "./routes/ticket.route";

connectDB();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.disable("x-powered-by");

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/ticket", ticketRouter);

app.use(globalErrorHandler);

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
