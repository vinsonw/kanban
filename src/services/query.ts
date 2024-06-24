import { Schema, z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBoardList, getRawBoardDataById } from "../utils";
import { Board } from "../schemas";

const getSafeRes = <T extends Schema>(
  rawRes: any,
  zodSchema: T,
): z.infer<T> => {
  const res = zodSchema.safeParse(rawRes);
  if (res.success) return res.data;
  throw res.error.message;
};

export const delay = (waitTime = 300) =>
  new Promise((resolve) => {
    setTimeout(resolve, waitTime);
  });

export const getBoardContentById = async (
  id: string,
): Promise<Board | null> => {
  await delay();
  const rawRes = getRawBoardDataById(id);
  // console.log("rawRes", rawRes);
  if (!rawRes) return null;
  return getSafeRes(rawRes, Board);
};

export const useQueryBoardList = () => {
  return useQuery({
    queryKey: ["boardList"],
    queryFn: () => {
      return getBoardList();
    },
  });
};

export const useQueryDisplayedBoardContent = () => {
  // useSearchParams() will trigger re-render when setSearchParams() is called elsewhere
  const [searchParams] = useSearchParams();
  const displayedBoardId = searchParams.get("boardId");
  return useQuery({
    queryKey: ["board", displayedBoardId],
    queryFn: async () => {
      if (!displayedBoardId) return null;
      return getBoardContentById(displayedBoardId);
    },
  });
};
