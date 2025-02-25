import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import boardsSlice from "../redux/boardsSlice";

function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className=' py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown '
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      <div className=' bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl'>
        <h3 className=' dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 '>ALL BOARDS ({boards?.length})</h3>

        <div className=' dropdown-borad  '>
          {boards.map((board, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-4  ${
                board.isActive && " bg-[#AFD198] rounded-r-full text-white mr-8 "
              } `}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} className='  filter-white  h-4 ' />{" "}
              <p className=' text-lg font-bold  '>{board.name}</p>
            </div>
          ))}

          <div
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className=' flex items-baseline space-x-2  text-[#AFD198] px-5 py-4  '
          >
            <img src={boardIcon} className='   filter-white  h-4 ' />
            <p className=' text-lg font-bold  '>Create New Board </p>
          </div>

          <div className=' mx-2  p-4  space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg'>
            <img src={lightIcon} alt='sun indicating light mode' />

            <img src={darkIcon} alt='moon indicating dark mode' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
