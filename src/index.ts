import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import timeout from "connect-timeout";

import { runDb } from "./repositories/db";
import { kanbanBoardRouter } from "./routes/kanban-board-router";

const app = express();
const {
  env: { PORT, NODE_ENV },
} = process;
const port = PORT || 3000;

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
  app.use(express.static("dist/index.js"));
}
if (NODE_ENV === "development") {
  console.log("node environment is development");
  app.use(express.static("dist/index.js"));
}

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();
