import BoardList from "../components/BoardList/BoardList";
import RawData from "../assets/data.json";
import SidebarToggle from "../components/SidebarToggle/SidebarToggle";
import "./Sidebar.scss";

interface Props {
  onHideSideBar: () => void;
}

const SideBar = ({ onHideSideBar }: Props) => {
  return (
    <div className="sidebar">
      <div className="board-list-wrapper">
        <BoardList
          borderList={RawData.boards.map((board) => ({
            id: board.name,
            boardName: board.name,
          }))}
        />
      </div>
      {/* theme toggle */}
      {/* sidebar toggle */}
      <div className="sidebar-toggle-wrapper">
        <SidebarToggle.HideSidebar onClick={onHideSideBar} />
      </div>
    </div>
  );
};

export default SideBar;
