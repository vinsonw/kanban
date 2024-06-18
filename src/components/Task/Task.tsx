import { Task as TaskType } from "../../schemas";
import "./Task.scss";
import Dialog from "../Dialog/Dialog";

const Test = () => (
  <div
    style={{
      width: 200,
      height: 200,
      background: "#fff",
    }}
  >
    hello
  </div>
);

const Task = ({ title, description, status, subtasks }: TaskType) => {
  const doneSubtaskNumber = subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;
  return (
    <Dialog dialogContent={<Test />}>
      <div className="task-wrapper">
        <div className="title">{title}</div>
        <div className="subtask-progress">{`${doneSubtaskNumber} of ${subtasks.length} subtasks`}</div>
      </div>
    </Dialog>
  );
};

export default Task;
