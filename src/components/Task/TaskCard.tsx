import React from "react";
import { Task } from "../../schemas";
import AddOrEditTask from "./AddOrEditTask";
import Dialog from "../Dialog/Dialog";
import TaskDetail, { TaskOperation } from "./TaskDetail";
import DeleteConfirm from "./DeleteConfirm";
import "./TaskCard.scss";
import { useDeleteTask } from "../../services/mutation";
import { useQueryDisplayedBoardContent } from "../../services/query";

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
    if (!openTaskDetailDialog) {
      setActiveOperationOfTask("view");
    }
  }, [openTaskDetailDialog]);

  const deleteTask = useDeleteTask();
  const { data: displayedBoard } = useQueryDisplayedBoardContent();

  return (
    <Dialog
      dialogTitle={activeOperationOfTask + " board"}
      open={openTaskDetailDialog}
      onOpenChange={setOpenTaskDetailDialog}
      dialogContent={
        activeOperationOfTask === "view" ? (
          <TaskDetail {...props} onTaskOperation={setActiveOperationOfTask} />
        ) : activeOperationOfTask === "edit" ? (
          <AddOrEditTask
            type="edit"
            task={props}
            onSuccess={() => {
              setOpenTaskDetailDialog(false);
            }}
          />
        ) : activeOperationOfTask === "delete" ? (
          <DeleteConfirm
            title="Delete this task?"
            description="Are you sure you want to delete the ‘Build settings UI’ task and its
        subtasks? This action cannot be reversed."
            onDelete={() => {
              deleteTask.mutate({
                boardId: displayedBoard!.id,
                taskId: props.id,
              });
            }}
            onCancel={() => {
              setOpenTaskDetailDialog(false);
            }}
          />
        ) : (
          <TaskDetail {...props} onTaskOperation={setActiveOperationOfTask} />
        )
      }
    >
      <button
        className="task-wrapper"
        onClick={() => setOpenTaskDetailDialog(true)}
      >
        <div className="title">{title}</div>
        <div className="subtask-progress">{`${doneSubtaskNumber} of ${subtasks.length} subtasks`}</div>
      </button>
    </Dialog>
  );
};

export default TaskCard;
