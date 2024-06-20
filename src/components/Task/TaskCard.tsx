import React from "react";
import AddOrEditTask from "./AddOrEditTask";
import { Task } from "../../schemas";
import "./TaskCard.scss";
import Dialog from "../Dialog/Dialog";
import TaskDetail, { TaskOperation } from "./TaskDetail";

const TaskCard = (props: Task) => {
  const { title, subtasks } = props;
  const doneSubtaskNumber = subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  const [openTaskDetailDialog, setOpenTaskDetailDialog] = React.useState(false);
  const [activeOperationOfTask, setActiveOperationOfTask] =
    React.useState<TaskOperation>("view");

  // reset operation to 'view' when dialog shows up
  React.useEffect(() => {
    if (openTaskDetailDialog) {
      setActiveOperationOfTask("view");
    }
  }, [openTaskDetailDialog]);

  return (
    <Dialog
      open={openTaskDetailDialog}
      onOpenChange={setOpenTaskDetailDialog}
      dialogContent={
        activeOperationOfTask === "view" ? (
          <TaskDetail {...props} onTaskOperation={setActiveOperationOfTask} />
        ) : activeOperationOfTask === "edit" ? (
          <AddOrEditTask type="edit" task={props} />
        ) : activeOperationOfTask === "delete" ? (
          "delete"
        ) : (
          <TaskDetail {...props} onTaskOperation={setActiveOperationOfTask} />
        )
      }
    >
      <div
        className="task-wrapper"
        onClick={() => setOpenTaskDetailDialog(true)}
      >
        <div className="title">{title}</div>
        <div className="subtask-progress">{`${doneSubtaskNumber} of ${subtasks.length} subtasks`}</div>
      </div>
    </Dialog>
  );
};

export default TaskCard;
