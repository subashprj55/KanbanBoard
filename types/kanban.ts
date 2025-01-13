// Type for a column in the Kanban board
export interface KanbanColumn {
  id: number;
  titleName: string;
  tasks: string[];
}

// Type for the entire Kanban board state
export type KanbanData = KanbanColumn[];
