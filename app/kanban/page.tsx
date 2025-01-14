"use client";
import React from "react";
import TaskContainer from "@/components/TaskContainer";
import { KanbanColumn } from "@/types/kanban";
import { DragDropContext } from "react-beautiful-dnd";
import { useKanbanStore } from "@/hooks/useKanbanBoard";

const kanban = () => {
  const { kanbanData } = useKanbanStore();

  const onDragEnd = (result: any) => {
    console.log(result);
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceId = parseInt(source.droppableId, 10);
    const destinationId = parseInt(destination.droppableId, 10);
    const taskIndex = source.index;
    const destinationIndex = destination.index;

    useKanbanStore
      .getState()
      .moveTask(sourceId, destinationId, taskIndex, destinationIndex);
  };

  return (
    <div className="mx-[5%] mt-14">
      <HeaderSection />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-5 mt-9 overflow-x-scroll">
          {kanbanData.map(({ id, titleName, tasks }: KanbanColumn) => {
            return (
              <TaskContainer
                key={id}
                id={id}
                titleName={titleName}
                tasks={tasks}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

const HeaderSection = () => {
  const { addColumn } = useKanbanStore();
  return (
    <div className="flex justify-between items-center">
      {/* <input
        type="text"
        placeholder="search tasks..."
        className="border-2 border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-gray-300 w-1/3"
      /> */}
      <h1 className="text-3xl font-semibold">KANBAN-BOARD</h1>
      <button
        onClick={() => addColumn("de")}
        className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Add Column
      </button>
    </div>
  );
};

export default kanban;
