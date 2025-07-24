import express, { Request, Response, NextFunction } from "express";
import { PORT } from "./config";

const port = PORT || 8080;

const app = express();

//MIDDLEWARE
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.send("API is Running");
});

//ROUTER

//ERROR HANDLER

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
