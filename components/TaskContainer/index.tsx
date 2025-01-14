"use client";
import React, { useState } from "react";
import DeleteIcon from "@/Icons/DeleteIcon";
import { ITaskContainerProps } from "./types";
import { useKanbanStore } from "@/hooks/useKanbanBoard";
import Tasks from "../Tasks";
import { Droppable } from "react-beautiful-dnd";

const TaskContainer = ({ id, titleName, tasks }: ITaskContainerProps) => {
  const [inputData, setInputData] = useState("");
  const { deleteColumn, addTask } = useKanbanStore();

  const handleAddTask = () => {
    addTask(id, inputData);
    setInputData("");
  };

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
          <div className="">
            <Droppable
              droppableId={`${id}`}
              isDropDisabled={false}
              isCombineEnabled={false}
              ignoreContainerClipping={false}
            >
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={` h-96  min-h-72 p-5 ${
                    snapshot.isDraggingOver ? "bg-gray-100" : ""
                  }`}
                >
                  {tasks.map((task, index) => {
                    return <Tasks key={task} index={index} task={task} />;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="border-t">
            <div className="p-5 flex flex-col gap-1">
              <input
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                className="border-2 border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                type="text"
                placeholder="Add new task"
              />
              <button
                onClick={handleAddTask}
                className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full"
              >
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
