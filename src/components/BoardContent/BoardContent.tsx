import { useDisplayedBoardInfo } from "../../hooks";
import { EmptyBoard } from "./EmptyBoard";
import Column from "./Column";
import "./BoardContent.scss";
import NewColumnButton from "./NewColumnButton";

export const BoardContent = () => {
  const { columns } = useDisplayedBoardInfo();
  return columns.length > 0 ? (
    <div className="columns-wrapper">
      {columns.map((column) => (
        <Column key={column.name} {...column} />
      ))}
      <NewColumnButton />
    </div>
  ) : (
    <EmptyBoard />
  );
};
