import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BoardItem, { type BoardItemProps } from "./BoardItem";
import "./BoardList.scss";
import CreateBoardItemButton from "./CreateNewBoardButton";
import Dialog from "../../components/Dialog/Dialog";
import AddOrEditBoard from "../../components/Task/AddOrEditBoard";

interface BorderListProps {
  borderList?: Pick<BoardItemProps, "boardName" | "id">[];
  onCreateNewBoard?: () => void;
  onSelectBoard?: (id: string) => void;
}

const BoardList = ({
  borderList = [],
  onCreateNewBoard,
  onSelectBoard,
}: BorderListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = React.useState(false);
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
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dialogContent={
          <AddOrEditBoard
            type="add"
            onSuccess={({ boardId }) => {
              setDialogOpen(false);
              navigate({ search: `boardId=${boardId}` });
            }}
          />
        }
      >
        <CreateBoardItemButton
          onClick={() => {
            onCreateNewBoard?.();
            setDialogOpen(true);
          }}
        />
      </Dialog>
    </>
  );
};

export default BoardList;
