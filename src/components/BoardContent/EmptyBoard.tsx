import "./EmptyBoard.scss";
import Button from "../Button/Button";

export const EmptyBoard = () => {
  return (
    <div className="empty-board-wrapper">
      <div className="empty-board-content">
        <p className="empty-text">
          This board is empty. Create a new column to get started.
        </p>
        <Button label="+Add new Column" />
      </div>
    </div>
  );
};
