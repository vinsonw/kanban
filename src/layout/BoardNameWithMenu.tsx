import "./BoardNameWithMenu.scss";
import React from "react";
import Dialog from "../components/Dialog/Dialog";
import BoardList from "../components/BoardList/BoardList";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import AddOrEditBoard from "../components/Task/AddOrEditBoard";
import CreateBoardItemButton from "../components/BoardList/CreateNewBoardButton";
import { useIsMobile } from "../hooks";
import { useQueryDisplayedBoardContent } from "../services/query";
import { getBoardList } from "../utils";

const BoardNameWithMenu = () => {
  const [dialogStatus, setDialogStatus] = React.useState<
    "closed" | "show-board-list" | "show-create-new-board"
  >("closed");
  const isDialogOpen = React.useMemo(
    () => dialogStatus !== "closed",
    [dialogStatus],
  );
  const isMobile = useIsMobile();
  const { data: board } = useQueryDisplayedBoardContent();

  return (
    <div
      className="board-name-wrapper"
      title={board?.name}
      onClick={() =>
        isMobile && !isDialogOpen && setDialogStatus("show-board-list")
      }
    >
      <Dialog
        dialogTitle="floating board list"
        open={dialogStatus !== "closed"}
        onOpenChange={() => setDialogStatus("closed")}
        dialogContent={
          dialogStatus === "show-board-list" ? (
            <div className="menu-wrapper">
              <div className="mobile-board-list">
                <BoardList
                  borderList={getBoardList().map((board) => ({
                    id: board.id,
                    boardName: board.name,
                  }))}
                  onSelectBoard={() => setDialogStatus("closed")}
                />
                <CreateBoardItemButton
                  onClick={() => setDialogStatus("show-create-new-board")}
                />
              </div>
              <div className="theme-toggle-wrapper">
                <ThemeToggle />
              </div>
            </div>
          ) : (
            <AddOrEditBoard
              type="add"
              onSuccess={() => {
                setDialogStatus("closed");
              }}
            />
          )
        }
      >
        <>
          <span className="name">
            {board?.name ?? (isMobile ? "Select" : "")}
          </span>
          {isMobile && (
            <div className="icon-wrapper">
              {isDialogOpen ? (
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
