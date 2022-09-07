import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// import { runDb } from "./repositories/db";
import { kanbanBoardRouter } from "./routes/kanban-board-router";

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://admin:31qyZRfkjkpE5E0h@zdanevich-incubator.sy4sfvr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database not connected" + err);
  });

const parserMiddleware = bodyParser({});
const corsMiddleware = cors();

app.use(parserMiddleware);
app.use(corsMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Igor123");
});

app.use("/kanbanBoard", kanbanBoardRouter);

const startApp = async () => {
  // await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();
