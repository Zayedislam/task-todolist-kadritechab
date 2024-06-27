import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";

import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";

import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
 
 
 
  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 z-20`
            : ` bg-[#AFD198] dark:bg-[#2b2c37] dark:hover:bg-[#AFD198] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full  `
        }
      >
        <div>
          {/* reWrite modal  */}

          {isSideBarOpen && (
            <div className=' bg-white  dark:bg-[#2b2c37]    w-full   py-4 rounded-xl'>
              <h3 className=' dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 '>
                ALL BOARDS ({boards?.length})
              </h3>

              <div className='  dropdown-borad flex flex-col h-[70vh]  justify-between '>
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={` flex items-baseline space-x-2 px-5 py-3 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#AFD198] dark:hover:bg-white dark:hover:text-[#AFD198] dark:text-white  ${
                        board.isActive && " bg-[#AFD198] rounded-full text-white mr-8 ml-2"
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className='  filter-white  h-4 ' />{" "}
                      <p className=' text-lg font-bold '>{board.name}</p>
                    </div>
                  ))}

                  <div
                    className=' flex  items-baseline space-x-2  mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#AFD198] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#AFD198] dark:hover:bg-white  '
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <img src={boardIcon} className='   filter-white  h-4 ' />
                    <p className=' text-lg font-bold  '>Create New Board </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && <AddEditBoardModal type='add' setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
}

export default Sidebar;
