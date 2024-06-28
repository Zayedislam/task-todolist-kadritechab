import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData("text", JSON.stringify({ taskIndex, prevColIndex: colIndex }));
  };
  const avatarUrls = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    // Add more URLs as needed
  ];
  console.log(task);
  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className='w-[280px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#AFD198] dark:text-white dark:hover:text-[#AFD198] cursor-pointer'
      >
        <p className='font-bold tracking-wide'>{task.title}</p>
        <p className='font-bold text-xs tracking-tighter mt-2 text-gray-500'>
          {completed} of {subtasks.length} completed tasks
        </p>
        <div className='flex items-center mt-2'>
          {Array.from({ length: task?.people_assign }).map((_, index) => (
            <img
              key={index}
              src={"https://via.placeholder.com/150"}
              alt={`Avatar ${index + 1}`}
              className='w-6 h-6 rounded-full mr-2'
            />
          ))}
        </div>
      </div>
      {isTaskModalOpen && (
        <TaskModal colIndex={colIndex} taskIndex={taskIndex} setIsTaskModalOpen={setIsTaskModalOpen} />
      )}
    </div>
  );
}

export default Task;
