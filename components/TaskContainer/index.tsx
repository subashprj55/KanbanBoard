import React from "react";
import DeleteIcon from "@/Icons/DeleteIcon";
import { ITaskContainerProps } from "./types";
import { useKanbanBoard } from "@/hooks/useKanbanBoard";

const TaskContainer = ({ id, titleName, tasks }: ITaskContainerProps) => {
  const { deleteColumn } = useKanbanBoard();
  const handleDeleteColumnClick = () => {
    deleteColumn(id);
  };
  return (
    <div>
      <div>
        <div className="border rounded-xl w-[400px] bg-white">
          <div className="flex justify-between p-5">
            <h4 className="text-xl font-semibold">{titleName}</h4>
            <DeleteIcon
              onClick={handleDeleteColumnClick}
              className="cursor-pointer hover:text-red-500"
            />
          </div>
          <div className="min-h-96 p-5">
            <div className="bg-gray-200 p-2 rounded-md mb-3">
              <p>Create new react project</p>
            </div>
            <div className="bg-gray-200 p-2 rounded-md">
              <p>Create new react project</p>
            </div>
          </div>
          <div className="border-t">
            <div className="p-5 flex flex-col gap-1">
              <input
                className="border-2 border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                type="text"
                placeholder="Add new task"
              />
              <button className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full">
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskContainer;
