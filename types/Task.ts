export interface TaskList {
  id: string;
  title: string;
  date?: string;
  tasks: Task[];
  labelID?: string;
  pinned: boolean;
  notification?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
}
export interface Label {
  id: string;
  title: string;
  color: string;
}
