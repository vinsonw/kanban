import { useSearchParams } from "react-router-dom";
import { getBoardInfoById } from "../apis";

export const useDisplayedBoardInfo = () => {
  const [searchParams] = useSearchParams();
  const displayedBoardId = searchParams.get("boardId") || "";
  return getBoardInfoById(displayedBoardId);
};
