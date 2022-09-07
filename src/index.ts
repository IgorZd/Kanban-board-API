import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import config from "config";
import timeout from "connect-timeout";

import { runDb } from "./repositories/db";
import { kanbanBoardRouter } from "./routes/kanban-board-router";

const app = express();
const {
  env: { PORT, MONGO_URL, NODE_ENV },
} = process;
const port = PORT || 3000;
const dbUrl =
  MONGO_URL ||
  "mongodb+srv://admin:31qyZRfkjkpE5E0h@zdanevich-incubator.sy4sfvr.mongodb.net/?retryWrites=true&w=majority?authSource=admin";

// const dbConfig: string = config.get("KanbanBoard.dbConfig.dbName");

// mongoose
//   .connect(dbConfig)
//   .then(() => {
//     console.log("Database connected");
//   })
//   .catch((err) => {
//     console.log("Database not connected" + err);
//   });

// mongoose
//   .connect(`${dbUrl}`)
//   .then(() => console.log(`Database connected at ${dbUrl}`))
//   .catch((err) => {
//     console.log("Database not connected" + err);
//   });

const parserMiddleware = bodyParser({});
const corsMiddleware = cors();

app.use(timeout("5s"));
app.use(parserMiddleware);
app.use(corsMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Igor123");
});

app.use("/kanbanBoard", kanbanBoardRouter);

if (NODE_ENV === "production") {
  console.log("node environment is production");
  app.use(express.static("client/dist"));
}

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();
