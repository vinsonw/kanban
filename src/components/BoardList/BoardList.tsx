import { useSearchParams } from "react-router-dom";
import BoardItem, { type BoardItemProps } from "./BoardItem";
import "./BoardList.scss";
import CreateBoardItemButton from "./CreateNewBoardButton";

interface BorderListProps {
  borderList?: Pick<BoardItemProps, "boardName" | "id">[];
}

const BoardList = ({ borderList = [] }: BorderListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <div className="all-board-number">ALL BOARDS ({borderList.length})</div>
      {borderList.map((item) => (
        <BoardItem
          {...item}
          selected={item.id === searchParams.get("boardId")}
          onSelect={() => setSearchParams({ boardId: item.id })}
          key={item.id}
        />
      ))}
      <CreateBoardItemButton />
    </>
  );
};

export default BoardList;
