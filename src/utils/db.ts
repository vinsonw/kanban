import db from "../db/data.json";

export const getBoardList = () => {
  return db.boards;
};

export const getBoardById = (id: string) => {
  return getBoardList().find((board) => board.id === id);
};
