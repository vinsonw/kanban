import { getBoardById } from "../utils";
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
export const getBoardInfoById = (id: string) => {
  const rawRes = getBoardById(id) || {};
  return getSafeRes(rawRes, Board);
};
