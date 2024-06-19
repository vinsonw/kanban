import "./TaskDetail.scss";
import { Task } from "../../schemas";
import SubtaskList from "./SubtaskList";
import Select from "../Select/Select";
import Dropdown, { type Option } from "../Dropdown/Dropdown";

const ELLIPSIS_OPTIONS: Option[] = [
  { id: "1", label: "Edit task" },
  { id: "2", label: "Delete Task", type: "warn" },
];

const TaskDetail = ({ title, description, subtasks }: Task) => {
  const handleSelect = (id: string) => {
    console.log(
      "selected",
      ELLIPSIS_OPTIONS.find((option) => option.id === id),
    );
  };
  return (
    <div className="task-detail-wrapper">
      <div className="title-wrapper">
        <div className="title">{title}</div>
        <Dropdown optionList={ELLIPSIS_OPTIONS} onSelect={handleSelect}>
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
