import { z } from "zod";
import cssVars from "../scss/vars.module.scss";

export const Subtask = z.object({
  id: z.string(),
  title: z.string(),
  isCompleted: z.boolean(),
});
export type Subtask = z.infer<typeof Subtask>;

export const Task = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  subtasks: z.array(Subtask),
});
export type Task = z.infer<typeof Task>;

export const Column = z.object({
  id: z.string(),
  name: z.string(),
  tasks: z.array(Task),
  iconColor: z.string().default(cssVars.mainPurple),
});
export type Column = z.infer<typeof Column>;

export const Board = z.object({
  name: z.string().default(""),
  id: z.string().default(""),
  columns: z.array(Column).default([]),
});
export type Board = z.infer<typeof Board>;
