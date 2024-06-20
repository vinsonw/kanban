import "./AddOrEditTask.scss";
import { Subtask, Task } from "../../schemas";
import SimpleInput from "./SimpleInput";
import React from "react";
import Button from "../Button/Button";
import { getRandomId } from "../../utils";
import Select from "../Select/Select";

type Props =
  | {
      type: "edit";
      task: Task;
    }
  | {
      type: "add";
      task?: Task;
    };

const taskChangeReducer = (task: Task, action: TaskAction): Task => {
  switch (action.type) {
    case "title":
      return { ...task, title: action.payload };
    case "description":
      return { ...task, description: action.payload };
    case "subtasks":
      return { ...task, subtasks: action.payload };
    case "status":
      return { ...task, status: action.payload };
  }
};
type TaskAction =
  | { type: "title"; payload: string }
  | { type: "description"; payload: string }
  | { type: "subtasks"; payload: Subtask[] }
  | { type: "status"; payload: string };

const AddOrEditTask = ({
  type = "add",
  task = {
    title: "",
    description: "",
    status: "",
    subtasks: [],
    id: getRandomId(),
  },
}: Props) => {
  const [{ title, description, status, subtasks }, dispatch] = React.useReducer(
    taskChangeReducer,
    task,
  );
  return (
    <div className="add-or-edit-task">
      <div className="what-to-do-with-the-task">
        {type === "add" ? "Add New Task" : "Edit Task"}
      </div>
      <div className="title">
        <div className="section-title">Title</div>
        <SimpleInput
          enableNonEmptyCheck
          value={title}
          onChange={(e) => {
            dispatch({ type: "title", payload: e.target.value });
          }}
        />
      </div>
      <div className="description">
        <div className="section-title">Description</div>
        <SimpleInput
          type="textarea"
          value={description}
          height={112}
          onChange={(e) => {
            dispatch({ type: "description", payload: e.target.value });
          }}
        />
      </div>
      <div className="subtasks">
        <div className="section-title">Subtasks</div>
        {subtasks.map(({ title, id }) => (
          <div className="subtask-item" key={id}>
            <SimpleInput
              enableNonEmptyCheck
              value={title}
              onChange={(e) => {
                const newSubtasks = [...subtasks];
                const foundSubtask = newSubtasks.find(
                  (subtask) => subtask.id === id,
                )!;
                foundSubtask.title = e.target.value;
                dispatch({ type: "subtasks", payload: newSubtasks });
              }}
            />
            <svg
              onClick={() => {
                const newSubtasks = subtasks.filter(
                  (subtask) => subtask.id !== id,
                )!;
                dispatch({ type: "subtasks", payload: newSubtasks });
              }}
              className="close-button"
              width="15"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="currentColor" fillRule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
          </div>
        ))}
        <div
          className="add-new-subtask"
          onClick={() => {
            const newSubtasks: Subtask[] = [
              ...subtasks,
              { isCompleted: false, title: "", id: getRandomId() },
            ];
            dispatch({ type: "subtasks", payload: newSubtasks });
          }}
        >
          <Button type="secondary" label="+Add New Subtask" />
        </div>
      </div>
      <div className="status-dropdown">
        <p className="status-title section-title">Status</p>
        <Select
          activeOption={{ id: status, label: status }}
          optionList={[
            { id: "Todo", label: "Todo" },
            { id: "Doing", label: "Doing" },
            { id: "Done", label: "Done" },
          ]}
        />
        <div className="save-button-wrapper">
          <Button label="Save Change" size="small" />
        </div>
      </div>
    </div>
  );
};

export default AddOrEditTask;
