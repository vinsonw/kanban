import BoardList from "../components/BoardList/BoardList";
import RawData from "../assets/data.json";
import "./Sidebar.scss";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="board-list-wrapper">
        <BoardList
          borderList={RawData.boards.map((board) => ({
            id: board.name,
            boardName: board.name,
          }))}
        />
      </div>
    </div>
  );
};

export default SideBar;
