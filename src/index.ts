import express, { Request, Response, NextFunction } from "express";
import { PORT } from "./config";

import { errorHandler } from "./middlewares/errorHandler.middleware";
import { AppError } from "./classes/AppError.utils";

import AuthRouter from "./routers/auth.router";
const port = PORT || 8000;

const app = express();

//MIDDLEWARE
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.send("API is Running");
});

//ROUTER

app.use("/api/auth", AuthRouter);

// UKNOWN ROUTE FALLBACK
app.use((req, res, next) => {
  next(new AppError(404, "Route not found"));
});

// GLOBAL ERROR HANDLER
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
