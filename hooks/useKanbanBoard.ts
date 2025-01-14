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

          if (sourceId === destinationId && sourceColumn) {
            const updatedTasks = Array.from(sourceColumn?.tasks);
            const [removedTask] = updatedTasks.splice(taskIndex, 1);
            updatedTasks.splice(destinationIndex, 0, removedTask);

            return {
              kanbanData: state.kanbanData.map((column) =>
                column.id === sourceId
                  ? { ...column, tasks: updatedTasks }
                  : column
              ),
            };
          }

          if (sourceColumn && destinationColumn) {
            const taskToMove = sourceColumn.tasks[taskIndex];

            // Remove the task from the source column
            const updatedSourceTasks = sourceColumn.tasks.filter(
              (_, index) => index !== taskIndex
            );

            // Add the task to the destination column
            const updatedDestinationTasks = [
              ...destinationColumn.tasks,
              taskToMove,
            ];

            return {
              kanbanData: state.kanbanData.map((column) =>
                column.id === sourceId
                  ? { ...column, tasks: updatedSourceTasks }
                  : column.id === destinationId
                  ? { ...column, tasks: updatedDestinationTasks }
                  : column
              ),
            };
          }
          return state;
        });
      },
    }),
    {
      name: "kanbanState", // Key for localStorage
    }
  )
);
