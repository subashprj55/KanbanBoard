export interface ITask {
  id: number;
  titleName: string;
  tasks: string[];
}

export interface ITaskContainerProps {
  id: number;
  titleName: string;
  tasks: string[];
  moveTask: (
    sourceId: number,
    destinationId: number,
    taskIndex: number,
    destinationIndex: number
  ) => void;
}
