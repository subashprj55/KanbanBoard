import { create } from "zustand";
import { persist } from "zustand/middleware";
import { KanbanColumn, KanbanData } from "@/types/kanban";

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

interface KanbanState {
  kanbanData: KanbanData;
  addColumn: (title: string) => void;
  deleteColumn: (id: number) => void;
  addTask: (id: number, task: string) => void;
  moveTask: (
    sourceId: number,
    destinationId: number,
    taskIndex: number,
    destinationIndex: number
  ) => void;
  deleteTask: (columnId: number, taskIndex: number) => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      kanbanData: initializeData,

      addColumn: (title) =>
        set((state) => ({
          kanbanData: [
            ...state.kanbanData,
            { id: Date.now(), titleName: title, tasks: [] },
          ],
        })),

      deleteColumn: (id) =>
        set((state) => ({
          kanbanData: state.kanbanData.filter(
            (column: KanbanColumn) => column.id !== id
          ),
        })),
      addTask: (columnId, task) =>
        set((state) => ({
          kanbanData: state.kanbanData.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  tasks: [...column.tasks, task],
                }
              : column
          ),
        })),
      moveTask: (sourceId, destinationId, taskIndex, destinationIndex) => {
        set((state) => {
          const sourceColumn = state.kanbanData.find(
            (column) => column.id === sourceId
          );
          const destinationColumn = state.kanbanData.find(
            (column) => column.id === destinationId
          );

          if (!sourceColumn || !destinationColumn) return state;

          // Same column reordering
          if (sourceId === destinationId) {
            const updatedTasks = Array.from(sourceColumn.tasks);
            const [movedTask] = updatedTasks.splice(taskIndex, 1);
            updatedTasks.splice(destinationIndex, 0, movedTask);

            return {
              kanbanData: state.kanbanData.map((column) =>
                column.id === sourceId
                  ? { ...column, tasks: updatedTasks }
                  : column
              ),
            };
          }

          // Moving between different columns
          const sourceTasks = Array.from(sourceColumn.tasks);
          const destinationTasks = Array.from(destinationColumn.tasks);

          // Remove task from the source column
          const [movedTask] = sourceTasks.splice(taskIndex, 1);

          // Insert task into the destination column at the specified index
          destinationTasks.splice(destinationIndex, 0, movedTask);

          return {
            kanbanData: state.kanbanData.map((column) =>
              column.id === sourceId
                ? { ...column, tasks: sourceTasks }
                : column.id === destinationId
                ? { ...column, tasks: destinationTasks }
                : column
            ),
          };
        });
      },
      deleteTask: (columnId, taskIndex) =>
        set((state) => ({
          kanbanData: state.kanbanData.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  tasks: column.tasks.filter((_, index) => index !== taskIndex),
                }
              : column
          ),
        })),
    }),
    {
      name: "kanbanState", // Key for localStorage
    }
  )
);
