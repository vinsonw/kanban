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
  if (existingBoardIndex !== undefined) {
    db.boards[existingBoardIndex] = board;
  } else {
    db.boards.push(board);
  }
  saveDb(db);
  await delay();
  return { code: "success" };
};

export const useMutateBoard = ({ boardId }: { boardId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["displayedContent"],
    mutationFn: updateBoardContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["displayedBoard", boardId] });
      queryClient.invalidateQueries({ queryKey: ["boardList"] });
    },
  });
};
