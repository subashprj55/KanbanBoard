"use client";
import React, { useState } from "react";
import TaskContainer from "@/components/TaskContainer";
import { KanbanColumn } from "./types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useKanbanStore } from "@/hooks/useKanbanBoard";

const Kanban: React.FC = () => {
  const { kanbanData, moveTask: stateMoveTask } = useKanbanStore();

  const moveTask = (
    sourceId: number,
    destinationId: number,
    taskIndex: number,
    destinationIndex: number
  ) => {
    stateMoveTask(sourceId, destinationId, taskIndex, destinationIndex);
  };

  return (
    <div className="mx-[5%] mt-14">
      <HeaderSection />
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-5 mt-9 overflow-x-auto">
          {kanbanData.map(({ id, titleName, tasks }: KanbanColumn) => (
            <TaskContainer
              key={id}
              id={id}
              titleName={titleName}
              tasks={tasks}
              moveTask={moveTask}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

const HeaderSection: React.FC = () => {
  const { addColumn } = useKanbanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnName, setColumnName] = useState("");

  const handleCreate = () => {
    if (columnName.trim() === "") return;
    addColumn(columnName.trim());
    setColumnName("");
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h1 className="text-2xl sm:text-3xl font-semibold">KANBAN-BOARD</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Add Column
      </button>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Column</h2>
            <input
              type="text"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              placeholder="Enter column name"
              className="border-2 border-gray-500 mb-4 rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-800"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;
