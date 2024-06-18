import { z } from "zod";
import cssVars from "../scss/vars.module.scss";

export const SubTask = z.object({
  title: z.string(),
  isCompleted: z.boolean(),
});
export type SubTask = z.infer<typeof SubTask>;

export const Task = z.object({
  title: z.string(),
  description: z.string(),
  status: z.string(),
  subtasks: z.array(SubTask),
});
export type Task = z.infer<typeof Task>;

export const Column = z.object({
  name: z.string(),
  tasks: z.array(Task),
  iconColor: z.string().default(cssVars.mainPurple),
});
export type Column = z.infer<typeof Column>;

export const Board = z.object({
  name: z.string(),
  id: z.string(),
  columns: z.array(Column),
});
export type Board = z.infer<typeof Board>;
