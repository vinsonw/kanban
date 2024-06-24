import BoardList from "../components/BoardList/BoardList";
import SidebarToggle from "../components/SidebarToggle/SidebarToggle";
import "./Sidebar.scss";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { useQueryBoardList } from "../services/query";
import { useMemo } from "react";

interface Props {
  onHideSideBar: () => void;
}

const SideBar = ({ onHideSideBar }: Props) => {
  const { data, isLoading } = useQueryBoardList();
  const boardList = useMemo(() => data ?? [], [isLoading, data]);
  return (
    <div className="sidebar">
      <div className="board-list-wrapper">
        <BoardList
          borderList={boardList.map((board) => ({
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
