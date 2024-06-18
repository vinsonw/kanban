import BoardList from "../components/BoardList/BoardList";
import SidebarToggle from "../components/SidebarToggle/SidebarToggle";
import "./Sidebar.scss";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { getBoardList } from "../utils/db";

interface Props {
  onHideSideBar: () => void;
}

const SideBar = ({ onHideSideBar }: Props) => {
  return (
    <div className="sidebar">
      <div className="board-list-wrapper">
        <BoardList
          borderList={getBoardList().map((board) => ({
            id: board.id,
            boardName: board.name,
          }))}
        />
      </div>
      {/* theme toggle */}
      <div className="theme-toggle-wrapper">
        <ThemeToggle />
      </div>
      {/* sidebar toggle */}
      <div className="sidebar-toggle-wrapper">
        <SidebarToggle.HideSidebar onClick={onHideSideBar} />
      </div>
    </div>
  );
};

export default SideBar;
