import db from "../db/data.json";
import { KB_DB } from "../constants";
import { Board } from "../schemas";
import { z } from "zod";

export const initDB = () => {
  const existingDb = localStorage.getItem(KB_DB);
  if (existingDb) return;
  db.boards.forEach((board) => {
    board.columns.forEach((column) => {
      // @ts-ignore
      column.id = getRandomId();
      column.tasks.forEach((task) => {
        // @ts-ignore
        task.id = getRandomId();
        task.subtasks.forEach((subtask) => {
          // @ts-ignore
          subtask.id = getRandomId();
        });
      });
    });
  });
  localStorage.setItem(KB_DB, JSON.stringify(db));
};

export const saveDb = (db: any) => {
  localStorage.setItem(KB_DB, JSON.stringify(db));
};

export const getBoardList = () => {
  const db = JSON.parse(localStorage.getItem(KB_DB)!);
  const parsedRes = z.array(Board).safeParse(db.boards);
  if (parsedRes.success) return parsedRes.data;

  throw new Error("Failed to parse board list");
};

export const getDb = () => {
  return JSON.parse(localStorage.getItem(KB_DB)!) as { boards: Board[] };
};

export const getBoardById = (id: string) => {
  const db = getDb();
  return db.boards.find((board: any) => board.id === id);
};

export const getRandomId = () =>
  Math.random().toString().slice(2, 8).padEnd(6, "0");
