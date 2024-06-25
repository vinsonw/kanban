import { useSearchParams } from "react-router-dom";
import BoardItem, { type BoardItemProps } from "./BoardItem";
import "./BoardList.scss";

interface BorderListProps {
  borderList?: Pick<BoardItemProps, "boardName" | "id">[];
  onSelectBoard?: (id: string) => void;
}

const BoardList = ({ borderList = [], onSelectBoard }: BorderListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <div className="all-board-number">ALL BOARDS ({borderList.length})</div>
      {borderList.map((item) => (
        <BoardItem
          {...item}
          selected={item.id === searchParams.get("boardId")}
          onSelect={() => {
            setSearchParams({ boardId: item.id });
            onSelectBoard?.(item.id);
          }}
          key={item.id}
        />
      ))}
    </>
  );
};

export default BoardList;
