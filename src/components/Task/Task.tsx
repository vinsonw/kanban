import { Task as TaskType } from "../../schemas";
import "./Task.scss";

const Task = ({ title, description, status, subtasks }: TaskType) => {
  const doneSubtaskNumber = subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;
  return (
    <div className="task-wrapper">
      <div className="title">{title}</div>
      <div className="subtask-progress">{`${doneSubtaskNumber} of ${subtasks.length} subtasks`}</div>
    </div>
  );
};

export default Task;
