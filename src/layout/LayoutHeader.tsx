import "./LayoutHeader.scss";
import Logo from "../components/Logo";
import Button from "../components/Button/Button";
import { useDisplayedBoardContent } from "../hooks";
import Dialog from "../components/Dialog/Dialog";
import AddOrEditTask from "../components/Task/AddOrEditTask";
import React from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import AddOrEditBoard from "../components/Task/AddOrEditBoard";
import DeleteConfirm from "../components/Task/DeleteConfirm";

type CurrentBoardEditStatus = "view" | "edit" | "delete-confirm";

const LayoutHeader = () => {
  let boardName: string;
  const displayedBoard = useDisplayedBoardContent();

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

  const [taskDialogOpen, setTaskDialogOpen] = React.useState(false);
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const [dropdownSelectDialogOpen, setDropdownSelectDialogOpen] =
    React.useState(false);
  const [currentBoardEditStatus, setCurrentBoardEditStatus] =
    React.useState<CurrentBoardEditStatus>("view");

  // dialog content when select dropdown options
  const dialogContentForOperationOnBoard =
    currentBoardEditStatus === "view" ? undefined : currentBoardEditStatus ===
      "edit" ? (
      <AddOrEditBoard type="edit" board={displayedBoard} />
    ) : (
      <DeleteConfirm
        title="Delete this board?"
        description="Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed."
        onDelete={() => {
          console.log("delete  board");
        }}
        onCancel={() => setDropdownSelectDialogOpen(false)}
      />
    );

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
          <Dialog
            open={taskDialogOpen}
            onOpenChange={setTaskDialogOpen}
            dialogContent={<AddOrEditTask type="add" />}
          >
            {/* add span wrapper to disable error from radix dialog */}
            <span>
              <Button
                onClick={() => setTaskDialogOpen(true)}
                label="+Add new task"
                disabled={shouldDisableAddNewTask}
              />
            </span>
          </Dialog>
        </div>
        <Dialog
          open={dropdownSelectDialogOpen}
          onOpenChange={setDropdownSelectDialogOpen}
          dialogContent={dialogContentForOperationOnBoard}
        >
          <div className="ellipsis-button">
            <Dropdown
              open={dropDownOpen}
              onSelect={(id) => {
                setCurrentBoardEditStatus(id as CurrentBoardEditStatus);
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
              <div className="ellipsis-wrapper">
                <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#828FA3" fillRule="evenodd">
                    <circle cx="2.308" cy="2.308" r="2.308" />
                    <circle cx="2.308" cy="10" r="2.308" />
                    <circle cx="2.308" cy="17.692" r="2.308" />
                  </g>
                </svg>
              </div>
            </Dropdown>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default LayoutHeader;
