import { useKanbanStore } from "@/hooks/useKanbanBoard";
import DeleteIcon from "@/Icons/DeleteIcon";
import React from "react";
import { useDrag } from "react-dnd";
import { DraggedItem, TasksProps } from "./types";

const Tasks: React.FC<TasksProps> = ({ task, index, sourceId }: any) => {
  const { deleteTask } = useKanbanStore();

  const [{ isDragging }, dragRef] = useDrag<
    DraggedItem,
    unknown,
    { isDragging: boolean }
  >({
    type: "TASK",
    item: { task, index, sourceId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDeleteClick = () => {
    deleteTask(sourceId, index);
  };

  return (
    <div
      // @ts-ignore
      ref={dragRef}
      className={`mb-2 cursor-pointer ${
        isDragging ? "shadow-lg opacity-75" : ""
      }`}
    >
      <div className="bg-gray-200 p-2 rounded-md mb-3 flex justify-between gap-3">
        <p>{task}</p>
        <DeleteIcon
          className="min-w-6 hover:text-pink-500"
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
};

export default Tasks;
