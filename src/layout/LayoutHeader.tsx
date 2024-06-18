import "./LayoutHeader.scss";
import Logo from "../components/Logo";
import Button from "../components/Button/Button";
import Ellipsis from "../components/Ellipsis/Ellipsis";
import { useDisplayedBoard } from "../hooks";

const LayoutHeader = () => {
  let boardName: string;
  const displayedBoard = useDisplayedBoard();

  if (displayedBoard) {
    boardName = displayedBoard.name;
  } else {
    boardName = "Select a board to view";
  }

  const shouldDisableAddNewTask = displayedBoard
    ? displayedBoard.columns.length > 0
      ? false
      : true
    : true;

  return (
    <div className="layout-header">
      <div className="logo-wrapper">
        <Logo />
      </div>
      <div className="board-banner">
        <div className="board-name" title={"todo"}>
          {boardName}
        </div>
        <div className="add-task-button">
          <Button label="+Add new task" disabled={shouldDisableAddNewTask} />
        </div>
        <div className="ellipsis-button">
          <Ellipsis />
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
