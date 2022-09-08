import { NextFunction, Request, Response } from "express";
import { kanbanBoardService } from "../domain/kanban-board-service";

export const isColumnIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const columnId = req.params.columnId;
  if (typeof columnId !== "string") {
    res.sendStatus(404);
    return;
  }
  const column = await kanbanBoardService.getColumnById(columnId);

  if (!column) {
    res.status(404).send("Column ID doesn't exist");
  } else next();
};

export const isTaskIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const columnId = req.params.columnId;
  const taskId = req.params.taskId;
  if (typeof columnId !== "string" || typeof taskId !== "string") {
    res.sendStatus(404);
    return;
  }
  const column = await kanbanBoardService.getColumnById(columnId);
  if (!column) {
    res.status(404).send("Column ID doesn't exist");
  } else {
    const task = await kanbanBoardService.getTaskById(columnId, taskId);
    if (!task) {
      res.status(404).send("Task ID doesn't exist");
    } else next();
  }
};
export const isReplacingIdsExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const homeColumnId: string = req.params.homeColumnId;
  const targetColumnId: string = req.params.targetColumnId;
  const taskId: string = req.params.taskId;

  if (
    typeof homeColumnId !== "string" ||
    typeof targetColumnId !== "string" ||
    typeof taskId !== "string"
  ) {
    res.sendStatus(404);
    return;
  }
  const homeColumn = await kanbanBoardService.getColumnById(homeColumnId);
  const targetColumn = await kanbanBoardService.getColumnById(targetColumnId);

  if (!homeColumn) {
    res.status(404).send("Home column ID doesn't exist");
    return;
  }
  if (!targetColumn) {
    res.status(404).send("Target column ID doesn't exist");
    return;
  }
  if (homeColumn && targetColumn) {
    const task = kanbanBoardService.getTaskById(homeColumnId, taskId);
    if (!task) {
      res.status(404).send("Task doesn't exist");
    } else next();
  }
};
