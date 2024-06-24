import React from "react";
import "./TaskDetail.scss";
import { Task } from "../../schemas";
import Select from "../Select/Select";
import SubtaskList from "./SubtaskList";
import Dropdown, { type Option } from "../Dropdown/Dropdown";
import { useMutateTask } from "../../services/mutation";
import { useQueryDisplayedBoardContent } from "../../services/query";

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

const TaskDetail = (
  props: Task & {
    onTaskOperation: (operation: TaskOperation) => void;
  },
) => {
  const { title, description, subtasks, status, onTaskOperation } = props;
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const handleSelectOperation = (operation: TaskOperation) => {
    console.log("operation", operation);
    onTaskOperation(operation);
  };

  const { data: board } = useQueryDisplayedBoardContent();
  const mutateTask = useMutateTask();
  const handleToggleSubtask = (
    subtaskId: string,
    isCompletedToSet: boolean,
  ) => {
    const newSubtasks = [...subtasks];
    const foundSubtask = newSubtasks.find(({ id }) => id === subtaskId)!;
    foundSubtask.isCompleted = isCompletedToSet;
    mutateTask.mutate({
      boardId: board!.id,
      task: { ...props, subtasks: newSubtasks },
    });
  };

  return (
    <div className="task-detail-wrapper">
      <div className="title-wrapper">
        <div className="title">{title}</div>
        <Dropdown<TaskOperation>
          open={openDropdown}
          onOpenChange={setOpenDropdown}
          optionList={ELLIPSIS_OPTIONS}
          onSelect={handleSelectOperation}
        >
          <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fillRule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
        </Dropdown>
      </div>
      <div className="description">{description}</div>
      <SubtaskList subtaskList={subtasks} toggleSubtask={handleToggleSubtask} />
      <div className="status-dropdown">
        <p className="status-title">Current Status</p>
        <Select
          onSelect={(id) => {
            mutateTask.mutate({
              boardId: board!.id,
              task: { ...props, status: id },
            });
          }}
          activeOption={{ id: status, label: status }}
          optionList={board!.columns.map((col) => ({
            id: col.name,
            label: col.name,
          }))}
        />
      </div>
    </div>
  );
};

export default TaskDetail;
