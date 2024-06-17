import SideBar from "./Sidebar";
import "./LayoutBody.scss";

const LayoutBody = () => {
  return (
    <div className="layout-body">
      <div className="sidebar-wrapper">
        <SideBar />
      </div>
      <div className="board-wrapper"></div>
    </div>
  );
};

export default LayoutBody;
