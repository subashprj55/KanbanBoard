"use client";
import React, { useState } from "react";
import DeleteIcon from "@/Icons/DeleteIcon";
import { ITaskContainerProps } from "./types";
import { useKanbanStore } from "@/hooks/useKanbanBoard";
import Tasks from "../Tasks";
import { useDrop } from "react-dnd";

const TaskContainer: React.FC<ITaskContainerProps> = ({
  id,
  titleName,
  tasks,
  moveTask,
}) => {
  const [inputData, setInputData] = useState<string>("");
  const { deleteColumn, addTask } = useKanbanStore();

  const handleAddTask = () => {
    if (inputData.trim()) {
      addTask(id, inputData.trim());
      setInputData("");
    }
  };

  const handleDeleteColumnClick = () => {
    deleteColumn(id);
  };

  // Drop logic for drag-and-drop
  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: { sourceId: number; index: number }) => {
      moveTask(item.sourceId, id, item.index, tasks.length);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="w-full min-w-52 md:w-[400px]">
      <div className="border rounded-xl bg-white shadow-md">
        {/* Header Section */}
        <div className="flex justify-between items-center p-5">
          <h4 className="text-base md:text-xl font-semibold">{titleName}</h4>
          <DeleteIcon
            onClick={handleDeleteColumnClick}
            className="cursor-pointer hover:text-red-500"
          />
        </div>

        {/* Task List Section */}
        <div
          //@ts-ignore
          ref={dropRef}
          className={`h-96 min-h-[18rem] overflow-y-auto p-5 transition-colors ${
            isOver ? "bg-gray-100" : ""
          }`}
        >
          {tasks.length > 0 ? (
            tasks.map((task: string, index: number) => (
              <Tasks key={index} index={index} task={task} sourceId={id} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No tasks available</p>
          )}
        </div>

        {/* Add Task Section */}
        <div className="border-t">
          <div className="p-5 flex flex-col gap-2">
            <input
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-600"
              type="text"
              placeholder="Add new task"
            />
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskContainer;
