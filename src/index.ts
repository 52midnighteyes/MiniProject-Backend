import express, { Request, Response, NextFunction } from "express";
import { PORT } from "./config";

import { errorHandler } from "./middlewares/errorHandler.middleware";
import { AppError } from "./utils/classes/AppError.utils";

const port = PORT || 8080;

const app = express();

//MIDDLEWARE
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.send("API is Running");
});

//ROUTER

// UKNOWN ROUTE FALLBACK
app.use((req, res, next) => {
  next(new AppError(404, "Route not found"));
});

// GLOBAL ERROR HANDLER
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
