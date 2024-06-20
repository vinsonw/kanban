import "./AddOrEditTask.scss";
import { Task } from "../../schemas";
import clsx from "clsx";
import React from "react";
import Button from "../Button/Button";
import { getRandomId } from "../../utils";
import Select from "../Select/Select";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Props =
  | {
      type: "edit";
      task: Task;
    }
  | {
      type: "add";
      task?: Task;
    };

type TaskStatus = "Todo" | "Doing" | "Done";

const FormValidateSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  subtasks: z.array(
    z.object({ id: z.string().min(1), title: z.string().min(1) }),
  ),
});

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      subtasks: task.subtasks.map(({ id, title }) => ({ id, title })),
    },
    mode: "all",
    resolver: zodResolver(FormValidateSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control,
    keyName: "subtasks",
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormValidateSchema>> = (
    data,
  ) => {
    const formDataToSave = { ...data, status: taskStatus };
    console.log("formDataToSave", formDataToSave);
  };

  const [taskStatus, setTaskStatus] = React.useState<TaskStatus>(
    task.status as TaskStatus,
  );

  return (
    <div className="add-or-edit-task">
      <div className="what-to-do-with-the-task">
        {type === "add" ? "Add New Task" : "Edit Task"}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <div className="title">
          <div className="section-title">Title</div>
          <div
            className={clsx("input-for-task-field-wrapper", {
              error: errors.title,
            })}
          >
            <input
              {...register("title")}
              className={clsx("input-for-task-field", { error: errors.title })}
              style={{ height: 40 }}
            />
            {errors.title && <div className="empty-label">Can't be empty</div>}
          </div>
        </div>
        {/* description */}
        <div className="description">
          <div className="section-title">Description</div>

          <textarea
            {...register("description")}
            className="textarea-for-task-field"
            rows={3}
            placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
          />
        </div>
        {/* subtasks */}
        <div className="subtasks">
          <div className="section-title">Subtasks</div>
          {fields.map(({ id }, index) => (
            <div className="subtask-item" key={id}>
              <div
                className={clsx("input-for-task-field-wrapper", {
                  error: errors.subtasks?.[index]?.title,
                })}
              >
                <input
                  {...register(`subtasks.${index}.title`)}
                  className={clsx("input-for-task-field", {
                    error: errors.subtasks?.[index]?.title,
                  })}
                  style={{ height: 40 }}
                />
                {errors.subtasks?.[index]?.title && (
                  <div className="empty-label">Can't be empty</div>
                )}
              </div>
              {/* x button */}
              <svg
                onClick={() => {
                  remove(index);
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
              append({ id: getRandomId(), title: "" });
            }}
          >
            <Button type="secondary" label="+Add New Subtask" />
          </div>
        </div>
        {/* status */}
        <div className="status-dropdown">
          <p className="status-title section-title">Status</p>
          <Select
            activeOption={{ id: taskStatus, label: taskStatus }}
            onSelect={(status) => {
              setTaskStatus(status as TaskStatus);
            }}
            optionList={[
              { id: "Todo", label: "Todo" },
              { id: "Doing", label: "Doing" },
              { id: "Done", label: "Done" },
            ]}
          />
          {/* save */}
          <div className="save-button-wrapper">
            <Button nativeType="submit" label="Save Change" size="small" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOrEditTask;
