import React from "react";
import "./TaskDetail.scss";
import { Subtask, Task } from "../../schemas";
import Select from "../Select/Select";
import SubtaskList from "./SubtaskList";
import Dropdown, { type Option } from "../Dropdown/Dropdown";

const ELLIPSIS_OPTIONS: Option<TaskOperation>[] = [
  {
    id: "edit",
    label: "Edit task",
  },
  {
    id: "delete",
    label: "Delete Task",
    type: "warn",
  },
];

export type TaskOperation = "edit" | "delete" | "view";
type TaskEditAction =
  | {
      type: "subtasks";
      payload: Subtask[];
    }
  | {
      type: "status";
      payload: string;
    };

const TaskDetail = ({
  title,
  description,
  subtasks,
  id,
  status,
  onTaskOperation,
}: Task & {
  onTaskOperation: (operation: TaskOperation) => void;
}) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const handleSelectOperation = (operation: string) => {
    console.log("operation", operation);
    onTaskOperation(operation as TaskOperation);
  };

  const [localState, dispatch] = React.useReducer(
    (state: Task, action: TaskEditAction) => {
      const { type, payload } = action;
      switch (type) {
        case "subtasks":
          return { ...state, subtasks: payload };
        case "status":
          return { ...state, status: payload };
        default:
          return state;
      }
    },
    {
      title,
      description,
      subtasks,
      id,
      status,
    },
  );

  const handleToggleSubtask = (
    subtaskId: string,
    isCompletedToSet: boolean,
  ) => {
    const newSubtasks = [...localState.subtasks];
    const foundSubtask = newSubtasks.find(({ id }) => id === subtaskId)!;
    foundSubtask.isCompleted = isCompletedToSet;
    dispatch({ type: "subtasks", payload: newSubtasks });
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
      <SubtaskList
        subtaskList={localState.subtasks}
        toggleSubtask={handleToggleSubtask}
      />
      <div className="status-dropdown">
        <p className="status-title">Current Status</p>
        <Select
          onSelect={(id) => {
            dispatch({ type: "status", payload: id });
          }}
          activeOption={{ id: localState.status, label: localState.status }}
          optionList={[
            { id: "Todo", label: "Todo" },
            { id: "Doing", label: "Doing" },
            { id: "Done", label: "Done" },
          ]}
        />
      </div>
    </div>
  );
};

export default TaskDetail;
