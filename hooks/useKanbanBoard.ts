import { KanbanColumn, KanbanData } from "@/types/kanban";
import { useEffect, useState } from "react";

const initializeData: KanbanData = [
  {
    id: 0,
    titleName: "To Do",
    tasks: [],
  },
  {
    id: 1,
    titleName: "In Progress",
    tasks: [],
  },
  {
    id: 2,
    titleName: "Done",
    tasks: [],
  },
];
export const useKanbanBoard = () => {
  const [kanbanData, setKanbanData] = useState(() => {
    const data = localStorage.getItem("kanbanState");
    return data ? JSON.parse(data) : initializeData;
  });

  useEffect(() => {
    localStorage.setItem("kanbanState", JSON.stringify(kanbanData));
  }, [kanbanData]);

  const addColumn = (title: string) => {
    const newData = { id: 3, titleName: "demo", tasks: [] };
    setKanbanData((pre: any) => {
      return [...pre, newData];
    });
  };

  const deleteColumn = (id: number) => {
    //TODO: remove amy
    setKanbanData((prev: any) =>
      prev.filter((column: any) => column.id !== id)
    );
  };

  return { kanbanData, deleteColumn, addColumn };
};
