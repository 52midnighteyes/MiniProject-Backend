import express, { Request, Response, NextFunction } from "express";
import { PORT, CORS_ORIGIN } from "./config";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler.middleware";
import { AppError } from "./classes/AppError.utils";

import AuthRouter from "./routers/auth.router";
import TranscationRouter from "./routers/transaction.router";
import UserRouter from "./routers/user.router";
import EventRouter from "./routers/event.router";
import CouponRouter from "./routers/coupon.router";
import PointRouter from "./routers/point.router";
import helmet from "helmet";

const port = Number(process.env.PORT) || Number(PORT) || 8000;

const app = express();
const corsOrigin =
  process.env.CORS_ORIGIN || CORS_ORIGIN || "http://localhost:3000";

//MIDDLEWARE
app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());

app.use(express.json());

app.use((req, res, next) => {
  console.log("===== Incoming Request =====");
  console.log("Time     :", new Date().toISOString());
  console.log("Method   :", req.method);
  console.log("URL      :", req.originalUrl);
  console.log("Headers  :", req.headers);
  console.log("Body     :", req.body);
  console.log("Query    :", req.query);
  console.log("============================\n");

  next();
});

app.get("/api", (req: Request, res: Response) => {
  res.send("API is Running");
});

//ROUTER

app.use("/api/auth", AuthRouter);
app.use("/api/transactions", TranscationRouter);
app.use("/api/users", UserRouter);
app.use("/api/events", EventRouter);
app.use("/api/coupons", CouponRouter);
app.use("/api/points", PointRouter);

// UKNOWN ROUTE FALLBACK
app.use((req, res, next) => {
  next(new AppError(404, "Route not found"));
});

// GLOBAL ERROR HANDLER
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
