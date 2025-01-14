export interface TasksProps {
  task: string;
  index: number;
  sourceId: number;
}

export interface DraggedItem {
  task: string;
  index: number;
  sourceId: string;
}
