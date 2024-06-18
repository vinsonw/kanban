import { useSearchParams } from "react-router-dom";
import { getBoardById } from "../utils/db";

export const useDisplayedBoard = () => {
  const [searchParams] = useSearchParams();
  const displayedBoardId = searchParams.get("boardId") || "";
  return getBoardById(displayedBoardId);
};
