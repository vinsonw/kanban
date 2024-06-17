import * as React from "react";
import BoardItem, { type BoardItemProps } from "./BoardItem";
import "./BoardList.scss";
import CreateBoardItemButton from "./CreateNewBoardButton";

interface BorderListProps {
  borderList?: Pick<BoardItemProps, "boardName" | "id">[];
}

const BoardList = ({ borderList = [] }: BorderListProps) => {
  const [selectedBoardId, setSelectedBoardId] = React.useState("");
  return (
    <>
      <div className="all-board-number">ALL BOARDS ({borderList.length})</div>
      {borderList.map((item) => (
        <BoardItem
          {...item}
          selected={item.id === selectedBoardId}
          onSelect={setSelectedBoardId}
          key={item.id}
        />
      ))}
      <CreateBoardItemButton />
    </>
  );
};

export default BoardList;
