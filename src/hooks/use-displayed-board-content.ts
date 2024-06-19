import { useSearchParams } from "react-router-dom";
import { getBoardContentById } from "../apis";

export const useDisplayedBoardContent = () => {
  const [searchParams] = useSearchParams();
  const displayedBoardId = searchParams.get("boardId") || "";
  return getBoardContentById(displayedBoardId);
};
