import { Task as TaskType } from "../../schemas";
import "./TaskCard.scss";
import Dialog from "../Dialog/Dialog";
import TaskDetail from "./TaskDetail";

const TaskCard = (props: TaskType) => {
  const { title, description, status, subtasks } = props;
  const doneSubtaskNumber = subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;
  return (
    <Dialog dialogContent={<TaskDetail {...props} />}>
      <div className="task-wrapper">
        <div className="title">{title}</div>
        <div className="subtask-progress">{`${doneSubtaskNumber} of ${subtasks.length} subtasks`}</div>
      </div>
    </Dialog>
  );
};

export default TaskCard;
