import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import boardIcon from "../assets/icon-board.svg";

function Column({ colIndex }) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const getColor = (colName) => {
    switch (colName) {
      case "New":
        return "bg-blue-500";
      case "Ongoing":
        return "bg-orange-500";
      case "Done":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const dispatch = useDispatch();
  const [color, setColor] = useState(null);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text"));

    if (colIndex !== prevColIndex) {
      dispatch(boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ backgroundColor: "", paddingBottom: "30px" }}>
      <div
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        className='scrollbar-hide   mx-5 pt-[90px] min-w-[280px] px-3 py-3 '
        style={{ backgroundColor: "#EEEDEB", borderRadius: "20px" }}
      >
        <p className=' font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]'>
          <div className={`rounded-full w-4 h-4 ${getColor(col.name)}`} />
          {col.name} ({col.tasks.length})
        </p>

        {col.tasks.map((task, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))}

        <div
          onClick={() => {
            setIsTaskModalOpen((prevState) => !prevState);
          }}
          className='flex text-gray-500 items-center p-2 bg-white border rounded shadow hover:bg-gray-100 cursor-pointer'
        >
          +Add New Task
          <img src={boardIcon} className='filter-white h-4 ml-auto' />
        </div>
      </div>

      {isTaskModalOpen && <AddEditTaskModal setIsAddTaskModalOpen={setIsTaskModalOpen} type='add' device='middle' />}
    </div>
  );
}

export default Column;
