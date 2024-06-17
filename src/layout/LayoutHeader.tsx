import "./LayoutHeader.scss";
import Logo from "../components/Logo";
import Button from "../components/Button/Button";
import Ellipsis from "../components/Ellipsis/Ellipsis";

const LayoutHeader = () => {
  return (
    <div className="layout-header">
      <div className="logo-wrapper">
        <Logo />
      </div>
      <div className="board-banner">
        <div className="board-name" title={"todo"}>
          {/* TODO: dynamic */}
          board name text text
        </div>
        <div className="add-task-button">
          <Button label="+Add new task" />
        </div>
        <div className="ellipsis-button">
          <Ellipsis />
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
