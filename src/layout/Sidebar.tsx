import BoardList from "../components/BoardList/BoardList";
import SidebarToggle from "../components/SidebarToggle/SidebarToggle";
import "./Sidebar.scss";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { useQueryBoardList } from "../services/query";
import { useMemo, useState } from "react";
import Dialog from "../components/Dialog/Dialog";
import AddOrEditBoard from "../components/Task/AddOrEditBoard";
import CreateBoardItemButton from "../components/BoardList/CreateNewBoardButton";
import { useNavigate } from "react-router-dom";

interface Props {
  onHideSideBar: () => void;
}

const SideBar = ({ onHideSideBar }: Props) => {
  const { data, isLoading } = useQueryBoardList();
  const boardList = useMemo(() => data ?? [], [isLoading, data]);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="sidebar">
      {/* board list */}
      <div className="board-list-wrapper">
        <BoardList
          borderList={boardList.map((board) => ({
            id: board.id,
            boardName: board.name,
          }))}
        />
        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          dialogTitle="add new board"
          dialogContent={
            <AddOrEditBoard
              type="add"
              onSuccess={({ boardId }) => {
                setDialogOpen(false);
                navigate({ search: `boardId=${boardId}` });
              }}
            />
          }
        >
          <CreateBoardItemButton
            onClick={() => {
              setDialogOpen(true);
            }}
          />
        </Dialog>
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
