import "./BoardContent.scss";
import { EmptyBoard } from "./EmptyBoard";
import Column from "./Column";
import Dialog from "../Dialog/Dialog";
import AddOrEditBoard from "../Task/AddOrEditBoard";
import { useQueryDisplayedBoardContent } from "../../services/query";

export const BoardContent = () => {
  const { data: board, isLoading } = useQueryDisplayedBoardContent();

  if (isLoading) return <h2 className="loading-text">loading</h2>;
  if (!board || !board.columns.length) {
    return <EmptyBoard />;
  }
  const { columns } = board;
  return (
    <div className="columns-wrapper">
      {columns.map((column) => (
        <Column key={column.id} {...column} />
      ))}
      <Dialog
        dialogTitle="+New Column"
        dialogContent={<AddOrEditBoard type="edit" board={board} />}
      >
        <button className="new-column-button-wrapper">
          <div className="label">+New Column</div>
        </button>
      </Dialog>
    </div>
  );
};
