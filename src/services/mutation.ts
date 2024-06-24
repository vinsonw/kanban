import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Board, Task } from "../schemas";
import { getDb, saveDb } from "../utils";
import { delay } from "./query";

export const updateBoardContent = async (
  board: Board,
): Promise<{ code: "error" } | { code: "success" }> => {
  const db = getDb();
  const existingBoardIndex = db.boards.findIndex(
    (_board) => _board.id === board.id,
  );
  if (existingBoardIndex > -1) {
    db.boards[existingBoardIndex] = board;
  } else {
    db.boards.push(board);
  }
  saveDb(db);
  await delay();
  return { code: "success" };
};

export const deleteBoardById = async ({ boardId }: { boardId: string }) => {
  const db = getDb();
  const existingBoardIndex = db.boards.findIndex(
    (_board) => _board.id === boardId,
  );
  if (existingBoardIndex > -1) {
    db.boards.splice(existingBoardIndex, 1);
  }
  saveDb(db);
  await delay();
  return { code: "success" };
};

export const useMutateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["board"],
    mutationFn: updateBoardContent,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["board", vars.id] });
      queryClient.invalidateQueries({ queryKey: ["boardList"] });
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["board"],
    mutationFn: deleteBoardById,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["displayedBoard", vars.boardId],
      });
      queryClient.invalidateQueries({ queryKey: ["boardList"] });
    },
  });
};

export const updateTaskContent = async ({
  boardId,
  task,
}: {
  boardId: string;
  task: Task;
}): Promise<{ code: "error" } | { code: "success" }> => {
  const db = getDb();
  const existingBoard = db.boards.find((_board) => _board.id === boardId);
  if (!existingBoard) {
    throw new Error(`boardId ${boardId} does not exist.`);
  }
  let shouldCreateTask = true;
  existingBoard.columns.forEach((column) => {
    column.tasks.forEach((_task, index) => {
      if (_task.id === task.id) {
        shouldCreateTask = false;
        // update task in the same column
        column.tasks[index] = task;
        // move task to another column
        if (_task.status !== task.status) {
          column.tasks.splice(index, 1);
          const newCol = existingBoard.columns.find(
            (column) => column.name == task.status,
          );
          newCol!.tasks.push(task);
        }
      }
    });
  });
  if (shouldCreateTask) {
    const columnToAppend = existingBoard.columns.find(
      (column) => column.name === task.status,
    );
    columnToAppend!.tasks.push(task);
  }
  saveDb(db);
  await delay();
  return { code: "success" };
};

export const useMutateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["task"],
    mutationFn: updateTaskContent,
    onSuccess: (_, vars) => {
      console.log("invalidate", vars.boardId);
      queryClient.invalidateQueries({ queryKey: ["board", vars.boardId] });
    },
  });
};

export const deleteTask = async ({
  boardId,
  taskId,
}: {
  boardId: string;
  taskId: string;
}) => {
  const db = getDb();
  const belongsToBoard = db.boards.find((_board) => _board.id === boardId);
  if (belongsToBoard) {
    belongsToBoard.columns.forEach((column) => {
      column.tasks.forEach((task, index) => {
        if (task.id === taskId) {
          column.tasks.splice(index, 1);
        }
      });
    });
  }
  saveDb(db);
  await delay();
  return { code: "success" };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["task"],
    mutationFn: deleteTask,
    onSuccess: (_, vars) => {
      console.log("invalidate", vars.taskId);
      queryClient.invalidateQueries({ queryKey: ["board", vars.boardId] });
    },
  });
};
