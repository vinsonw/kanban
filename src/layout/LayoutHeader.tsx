import "./LayoutHeader.scss";
import Logo from "../components/Logo";
import Button from "../components/Button/Button";
import { useIsMobile } from "../hooks";
import { useQueryDisplayedBoardContent } from "../services/query";
import Dialog from "../components/Dialog/Dialog";
import AddOrEditTask from "../components/Task/AddOrEditTask";
import React from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import AddOrEditBoard from "../components/Task/AddOrEditBoard";
import DeleteConfirm from "../components/Task/DeleteConfirm";
import BoardNameWithMenu from "./BoardNameWithMenu";
import clsx from "clsx";
import { useSidebarExpanded } from "./Layout.hooks";
import { useDeleteBoard } from "../services/mutation";
import { useNavigate } from "react-router-dom";
import { ROOT_PATH } from "../constants";

type CurrentBoardEditStatus = "view" | "edit" | "delete-confirm";

const LayoutHeader = () => {
  const { data: displayedBoard } = useQueryDisplayedBoardContent();

  const shouldDisableAddNewTask = displayedBoard
    ? displayedBoard.columns.length > 0
      ? false
      : true
    : true;

  const [taskDialogOpen, setTaskDialogOpen] = React.useState(false);
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const [boardDialogOpen, setBoardDialogOpen] = React.useState(false);
  const [currentBoardEditStatus, setCurrentBoardEditStatus] =
    React.useState<CurrentBoardEditStatus>("view");
  const isMobile = useIsMobile();

  // dialog content when select dropdown options
  const deleteBoardMutate = useDeleteBoard();
  const navigate = useNavigate();
  const dialogContentForOperationOnBoard =
    !displayedBoard ? null : currentBoardEditStatus ===
      "view" ? undefined : currentBoardEditStatus === "edit" ? (
      <AddOrEditBoard
        type="edit"
        board={displayedBoard}
        onSuccess={() => {
          console.log("board dialog set to close");
          setBoardDialogOpen(false);
        }}
      />
    ) : (
      <DeleteConfirm
        title="Delete this board?"
        description="Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed."
        onDelete={() => {
          deleteBoardMutate.mutate(
            {
              boardId: displayedBoard.id,
            },
            {
              onSuccess: () => {
                setBoardDialogOpen(false);
                navigate(ROOT_PATH);
              },
            },
          );
        }}
        onCancel={() => setBoardDialogOpen(false)}
      />
    );

  const [sidebarExpanded] = useSidebarExpanded();

  return (
    <div className="layout-header">
      <div
        className={clsx("logo-wrapper", {
          "without-sidebar": !sidebarExpanded,
        })}
      >
        <Logo />
      </div>
      <div className="board-banner">
        <BoardNameWithMenu />
        <div className="add-task-button">
          <Dialog
            dialogTitle="add task"
            open={taskDialogOpen}
            onOpenChange={setTaskDialogOpen}
            dialogContent={
              <AddOrEditTask
                type="add"
                onSuccess={() => setTaskDialogOpen(false)}
              />
            }
          >
            {/* add span wrapper to disable error from radix dialog */}
            <span>
              <Button
                style={{ padding: "10px 18px", height: "unset", flexShrink: 0 }}
                onClick={() => setTaskDialogOpen(true)}
                label={
                  isMobile ? (
                    <svg
                      width="12"
                      height="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#FFF"
                        d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                      />
                    </svg>
                  ) : (
                    "+Add new task"
                  )
                }
                disabled={shouldDisableAddNewTask}
              />
            </span>
          </Dialog>
        </div>

        <div className="ellipsis-button">
          <Dialog
            dialogTitle={currentBoardEditStatus + " board"}
            open={boardDialogOpen}
            onOpenChange={setBoardDialogOpen}
            dialogContent={dialogContentForOperationOnBoard}
          >
            <Dropdown<CurrentBoardEditStatus>
              className="ellipsis-wrapper"
              disabled={!displayedBoard}
              open={dropDownOpen}
              onSelect={(id) => {
                setCurrentBoardEditStatus(id);
                setBoardDialogOpen(true);
              }}
              onOpenChange={setDropDownOpen}
              optionList={[
                {
                  id: "edit",
                  label: "Edit board",
                },
                {
                  id: "delete-confirm",
                  label: "Delete board",
                  type: "warn",
                },
              ]}
            >
              <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="#828FA3" fillRule="evenodd">
                  <circle cx="2.308" cy="2.308" r="2.308" />
                  <circle cx="2.308" cy="10" r="2.308" />
                  <circle cx="2.308" cy="17.692" r="2.308" />
                </g>
              </svg>
            </Dropdown>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
