import * as Checkbox from "@radix-ui/react-checkbox";
import { Subtask } from "../../schemas";
import "./SubtaskList.scss";

interface Props {
  subtaskList: Subtask[];
  toggleSubtask: (subtaskId: string, isCompleted: boolean) => void;
}

const SubtaskList = ({ subtaskList, toggleSubtask }: Props) => {
  return (
    <div className="subtask-list-wrapper">
      <p className="list-title">{`Subtasks(${subtaskList.filter((item) => item.isCompleted).length} of ${subtaskList.length})`}</p>
      {subtaskList.map((subtask) => (
        <div
          className="subtask-item-wrapper"
          key={subtask.title}
          onClick={() => toggleSubtask(subtask.id, !subtask.isCompleted)}
        >
          <Checkbox.Root
            className="indicator"
            checked={subtask.isCompleted}
            id={subtask.title}
            onCheckedChange={() =>
              toggleSubtask(subtask.id, !subtask.isCompleted)
            }
          >
            <Checkbox.Indicator className="icon-wrapper">
              <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke="#FFF"
                  strokeWidth="2"
                  fill="none"
                  d="m1.276 3.066 2.756 2.756 5-5"
                />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="label" htmlFor={subtask.title}>
            {subtask.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SubtaskList;
