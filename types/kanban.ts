export interface KanbanColumn {
  id: number;
  titleName: string;
  tasks: string[];
}

export type KanbanData = KanbanColumn[];
