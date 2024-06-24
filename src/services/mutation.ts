import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Board } from "../schemas";
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
