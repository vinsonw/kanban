import "./EmptyBoard.scss";
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import AddOrEditBoard from "../Task/AddOrEditBoard";
import { useDisplayedBoardContent } from "../../hooks";

export const EmptyBoard = () => {
  const board = useDisplayedBoardContent();
  return (
    <div className="empty-board-wrapper">
      <div className="empty-board-content">
        <p className="empty-text">
          This board is empty. Create a new column to get started.
        </p>
        <Dialog dialogContent={<AddOrEditBoard type="edit" board={board} />}>
          <span>
            <Button label="+Add new Column" />
          </span>
        </Dialog>
      </div>
    </div>
  );
};
