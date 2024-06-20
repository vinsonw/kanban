import "./TaskDetail.scss";
import { Task } from "../../schemas";
import SubtaskList from "./SubtaskList";
import Select from "../Select/Select";
import Dropdown, { type Option } from "../Dropdown/Dropdown";
import React from "react";

const ELLIPSIS_OPTIONS: Option<TaskOperation>[] = [
  {
    id: "edit",
    label: "Edit task",
    dialogContentComponent: () => <div>edit</div>,
  },
  {
    id: "delete",
    label: "Delete Task",
    type: "warn",
    dialogContentComponent: () => <div>delete</div>,
  },
];

export type TaskOperation = "edit" | "delete" | "view";

const TaskDetail = ({
  title,
  description,
  subtasks,
  onTaskOperation,
}: Task & {
  onTaskOperation: (operation: TaskOperation) => void;
}) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const handleSelectOperation = (operation: string) => {
    console.log("operation", operation);
    onTaskOperation(operation as TaskOperation);
  };

  return (
    <div className="task-detail-wrapper">
      <div className="title-wrapper">
        <div className="title">{title}</div>
        <Dropdown
          open={openDropdown}
          onOpenChange={setOpenDropdown}
          optionList={ELLIPSIS_OPTIONS}
          onSelect={handleSelectOperation}
        >
          <button className="ellipsis-button">
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fillRule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </button>
        </Dropdown>
      </div>
      <div className="description">{description}</div>
      <SubtaskList subtaskList={subtasks} />
      <div className="status-dropdown">
        <p className="status-title">Current Status</p>
        <Select
          activeOption={{ id: "1", label: "Todo" }}
          optionList={[
            { id: "1", label: "Todo" },
            { id: "2", label: "Doing" },
            { id: "3", label: "Done" },
          ]}
        />
      </div>
    </div>
  );
};

export default TaskDetail;
