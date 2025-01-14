import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Tasks = ({ task, index }: any) => {
  return (
    <>
      <Draggable draggableId={task} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`mb-2 ${snapshot.isDragging ? "shadow-lg" : ""}`}
          >
            <div className="bg-gray-200 p-2 rounded-md mb-3">
              <p>{task}</p>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Tasks;
