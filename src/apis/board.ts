import { getBoardById, getDb, saveDb } from "../utils";
import { Board } from "../schemas";
import { Schema, z } from "zod";

const getSafeRes = <T extends Schema>(
  rawRes: any,
  zodSchema: T,
): z.infer<T> => {
  const res = zodSchema.safeParse(rawRes);
  if (res.success) return res.data;
  throw res.error.message;
};

/*  */
export const getBoardContentById = (id: string) => {
  const rawRes = getBoardById(id);
  if (!rawRes) return null;
  return getSafeRes(rawRes, Board);
};

export const updateBoardContent = (
  board: Board,
): { code: "error" } | { code: "success" } => {
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
  return { code: "success" };
};
