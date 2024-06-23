import "./BoardNameWithMenu.scss";
import Dialog from "../components/Dialog/Dialog";
import BoardList from "../components/BoardList/BoardList";
import { getBoardList } from "../utils";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import React, { useEffect } from "react";
import AddOrEditBoard from "../components/Task/AddOrEditBoard";
import { useDisplayedBoardContent, useIsMobile } from "../hooks";

const BoardNameWithMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [openCreateNewBoard, setOpenCreateNewBoard] = React.useState(false);
  const isMobile = useIsMobile();
  const board = useDisplayedBoardContent();
  useEffect(() => {
    if (open) {
      setOpenCreateNewBoard(false);
    }
  }, [open]);
  return (
    <div
      className="board-name-wrapper"
      title={board.name}
      onClick={() => isMobile && !open && setOpen(true)}
    >
      <Dialog
        open={open}
        onOpenChange={setOpen}
        dialogContent={
          !openCreateNewBoard ? (
            <div className="menu-wrapper">
              <div className="mobile-board-list">
                <BoardList
                  borderList={getBoardList().map((board) => ({
                    id: board.id,
                    boardName: board.name,
                  }))}
                  onSelectBoard={() => setOpen(false)}
                  onCreateNewBoard={() => {
                    setOpenCreateNewBoard(true);
                  }}
                />
              </div>
              <div className="theme-toggle-wrapper">
                <ThemeToggle />
              </div>
            </div>
          ) : (
            <AddOrEditBoard type="add" />
          )
        }
      >
        <>
          <span className="name">{board.name}</span>
          {isMobile && (
            <div className="icon-wrapper">
              {open ? (
                <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="#635FC7"
                    strokeWidth="2"
                    fill="none"
                    d="M9 6 5 2 1 6"
                  />
                </svg>
              ) : (
                <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="#635FC7"
                    strokeWidth="2"
                    fill="none"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              )}
            </div>
          )}
        </>
      </Dialog>
    </div>
  );
};

export default BoardNameWithMenu;
