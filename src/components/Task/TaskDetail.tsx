import "./TaskDetail.scss";
import { Task } from "../../schemas";
import SubtaskList from "./SubtaskList";
import Select from "../Select/Select";

const TaskDetail = ({ title, description, subtasks }: Task) => {
  return (
    <div className="task-detail-wrapper">
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <SubtaskList subtaskList={subtasks} />
      <div className="status-dropdown">
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
