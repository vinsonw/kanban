import "./AddOrEditBoard.scss";
import { Board, Column } from "../../schemas";
import clsx from "clsx";
import Button from "../Button/Button";
import { getRandomId } from "../../utils";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutateBoard } from "../../services/mutation";

type Props = (
  | {
      type: "edit";
      board: Board;
    }
  | {
      type: "add";
      board?: Board;
    }
) & {
  onSuccess?: ({ boardId }: { boardId: string }) => void;
};

const FormValidateSchema = z.object({
  name: z.string().min(1),
  columns: z.array(
    z.object({ id: z.string().min(1), name: z.string().min(1) }),
  ),
});

const AddOrEditBoard = ({
  type = "add",
  board = {
    id: getRandomId(),
    name: "",
    columns: [],
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
      name: board.name,
      columns: board.columns.map(({ name, id }) => ({ name, id })),
    },
    mode: "all",
    resolver: zodResolver(FormValidateSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "columns",
    control,
  });

  const mutateBoard = useMutateBoard();

  const onSubmit: SubmitHandler<z.infer<typeof FormValidateSchema>> = async (
    data,
  ) => {
    //@ts-ignore
    data.id = board.id;
    const newCompleteColumns: Column[] = data.columns.map((col) => {
      const oldCol = board.columns.find((_col) => _col.id === col.id);
      if (oldCol) return { ...oldCol, ...col };
      return { ...col, tasks: [], iconColor: "" };
    });
    data.columns = newCompleteColumns;
    mutateBoard.mutate(data as Board, {
      onSuccess(data, vars) {
        if (data.code === "success") {
          console.log("add or edit mutate success", data);
          onSuccess?.({ boardId: vars.id });
        }
      },
    });
  };

  return (
    <div className="add-or-edit-board">
      <div className="what-to-do-with-the-task">
        {type === "add" ? "Add New Board" : "Edit Board"}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={mutateBoard.isPending}>
          {/* name */}
          <div className="title">
            <div className="section-title">Name</div>
            <div
              className={clsx("input-for-task-field-wrapper", {
                error: errors.name,
              })}
            >
              <input
                {...register("name")}
                className={clsx("input-for-task-field", { error: errors.name })}
                style={{ height: 40 }}
              />
              {errors.name && <div className="empty-label">Can't be empty</div>}
            </div>
          </div>

          {/* columns */}
          <div className="subtasks">
            <div className="section-title">Columns</div>
            {fields.map(({ id }, index) => (
              <div className="subtask-item" key={id}>
                <div
                  className={clsx("input-for-task-field-wrapper", {
                    error: errors.columns?.[index]?.name,
                  })}
                >
                  <input
                    {...register(`columns.${index}.name`)}
                    className={clsx("input-for-task-field", {
                      error: errors.columns?.[index]?.name,
                    })}
                    style={{ height: 40 }}
                  />
                  {errors.columns?.[index]?.name && (
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
                append({ id: getRandomId(), name: "" });
              }}
            >
              <Button type="secondary" size="small" label="+Add New Column" />
            </div>
          </div>
          {/* create */}
          <div className="save-button-wrapper">
            <Button nativeType="submit" label="Save Change" size="small" />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddOrEditBoard;
