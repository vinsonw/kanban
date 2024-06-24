import "./EmptyBoard.scss";
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import AddOrEditBoard from "../Task/AddOrEditBoard";
import { useQueryDisplayedBoardContent } from "../../services/query";

export const EmptyBoard = () => {
  const { data: board } = useQueryDisplayedBoardContent();
  return (
    <div className="empty-board-wrapper">
      <div className="empty-board-content">
        {board ? (
          <>
            <p className="empty-text">
              This board is empty. Create a new column to get started.
            </p>
            <Dialog
              dialogTitle="+Add new Column"
              dialogContent={<AddOrEditBoard type="edit" board={board} />}
            >
              <span>
                <Button label="+Add new Column" />
              </span>
            </Dialog>
          </>
        ) : (
          <>
            <p className="empty-text">Select a board to start.</p>
          </>
        )}
      </div>
    </div>
  );
};
