import { Label, TaskList } from "@/types/Task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITasksState {
  taskLists: TaskList[];
  labels: Label[];
}

const DEFAULT_STATE: ITasksState = {
  taskLists: [],
  labels: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: DEFAULT_STATE,
  reducers: {
    addTaskList(state: ITasksState, action: PayloadAction<TaskList>) {
      state.taskLists.push(action.payload);
    },
    addLabel(state: ITasksState, action: PayloadAction<Label>) {
      state.labels.push(action.payload);
    },
    updateTaskList(state: ITasksState, action: PayloadAction<TaskList>) {
      const index = state.taskLists.findIndex(
        (taskList) => taskList.id === action.payload.id
      );
      if (index !== -1) {
        state.taskLists[index] = action.payload;
      }
    },
    updateLabel(state: ITasksState, action: PayloadAction<Label>) {
      const index = state.labels.findIndex(
        (label) => label.id === action.payload.id
      );
      if (index !== -1) {
        state.labels[index] = action.payload;
      }
    },
    deleteTaskList(state: ITasksState, action: PayloadAction<string>) {
      state.taskLists = state.taskLists.filter(
        (taskList) => taskList.id !== action.payload
      );
    },
    deleteLabel(state: ITasksState, action: PayloadAction<string>) {
      state.labels = state.labels.filter(
        (label) => label.id !== action.payload
      );
    },
    setTaskLists(state: ITasksState, action: PayloadAction<TaskList[]>) {
      state.taskLists = action.payload;
    },
    setLabels(state: ITasksState, action: PayloadAction<Label[]>) {
      state.labels = action.payload;
    },
  },
});

export const {
  addTaskList,
  addLabel,
  updateTaskList,
  deleteLabel,
  updateLabel,
  deleteTaskList,
  setTaskLists,
  setLabels,
} = taskSlice.actions;

const taskReducer = taskSlice.reducer;
export default taskReducer;
