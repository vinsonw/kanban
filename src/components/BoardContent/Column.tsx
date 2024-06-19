import TaskCard from "../Task/TaskCard";
import { Column as ColumnType } from "../../schemas";
import "./Column.scss";

const Column = ({ tasks, name, iconColor }: ColumnType) => {
  return (
    <div
      className="board-column-wrapper"
      style={{ "--column-icon-color": iconColor } as React.CSSProperties}
    >
      <div className="column-header">
        <div className="icon-div"></div>
        <span className="text">{`${name} (${tasks.length})`}</span>
      </div>
      <div className="task-list-wrapper">
        {tasks.map((task) => (
          <TaskCard key={task.title} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
