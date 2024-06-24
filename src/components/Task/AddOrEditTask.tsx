import "./AddOrEditTask.scss";
import { Task } from "../../schemas";
import clsx from "clsx";
import Button from "../Button/Button";
import { getRandomId } from "../../utils";
import Select from "../Select/Select";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutateTask } from "../../services/mutation";
import { useQueryDisplayedBoardContent } from "../../services/query";
import { Controller } from "react-hook-form";

type Props = (
  | {
      type: "edit";
      task: Task;
    }
  | {
      type: "add";
      task?: Task;
    }
) & {
  onSuccess?: (taskId: string) => void;
};

// note: this scheme acts like a filter for undeclared fields,
// which is the default  behavior of zod
const FormValidateSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  subtasks: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      isCompleted: z.boolean().default(false),
    }),
  ),
  status: z.string().min(1),
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
  onSuccess,
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
      subtasks: task.subtasks.map(({ id, title, isCompleted }) => ({
        id,
        title,
        isCompleted,
      })),
      status: task.status || "",
    },
    mode: "all",
    resolver: zodResolver(FormValidateSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control,
  });

  const mutateTask = useMutateTask();
  const { data: board } = useQueryDisplayedBoardContent();
  const onSubmit: SubmitHandler<z.infer<typeof FormValidateSchema>> = (
    formData,
  ) => {
    formData.subtasks = formData.subtasks.map((subtask) => {
      const oldSubtask = task.subtasks.find(
        (_subtask) => _subtask.id === subtask.id,
      );
      if (oldSubtask) return { ...oldSubtask, ...subtask };
      return subtask;
    });
    mutateTask.mutate(
      {
        boardId: board!.id,
        task: { ...task, ...formData } as Task,
      },
      {
        onSuccess: (_, vars) => {
          console.log("vars after mutate task", vars);
          onSuccess?.(vars.task.id);
        },
      },
    );
  };

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
              append({ id: getRandomId(), title: "", isCompleted: false });
            }}
          >
            <Button type="secondary" size="small" label="+Add New Subtask" />
          </div>
        </div>
        {/* status */}
        <div className="status-dropdown">
          <Controller
            control={control}
            name="status"
            render={({ field: { value, onChange }, fieldState }) => (
              <>
                <p className="status-title section-title">Status</p>
                <Select
                  error={!!fieldState.error}
                  activeOption={{ id: value, label: value }}
                  onSelect={(status) => {
                    onChange(status);
                  }}
                  optionList={board!.columns.map((col) => ({
                    id: col.name,
                    label: col.name,
                  }))}
                />
              </>
            )}
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
