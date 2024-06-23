import { useDisplayedBoardContent } from "../../hooks";
import { EmptyBoard } from "./EmptyBoard";
import Column from "./Column";
import "./BoardContent.scss";
import Dialog from "../Dialog/Dialog";
import AddOrEditBoard from "../Task/AddOrEditBoard";

export const BoardContent = () => {
  const board = useDisplayedBoardContent();
  if (!board || !board.columns.length) {
    return <EmptyBoard />;
  }
  const { columns } = board;
  return (
    <div className="columns-wrapper">
      {columns.map((column) => (
        <Column key={column.name} {...column} />
      ))}
      <Dialog dialogContent={<AddOrEditBoard type="edit" board={board} />}>
        <button className="new-column-button-wrapper">
          <div className="label">+New Column</div>
        </button>
      </Dialog>
    </div>
  );
};
