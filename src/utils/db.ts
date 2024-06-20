import db from "../db/data.json";

export const getBoardList = () => {
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
  return db.boards;
};

export const getBoardById = (id: string) => {
  return getBoardList().find((board) => board.id === id);
};

export const getRandomId = () =>
  Math.random().toString().slice(2, 8).padEnd(6, "0");
