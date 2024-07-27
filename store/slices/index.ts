import configReducer, { IConfigState } from "./config";
import taskReducer, { ITasksState } from "./tasks";

const slices = {
  tasks: taskReducer,
  config: configReducer,
};
export interface StoreState {
  tasks: ITasksState;
  config: IConfigState;
}

export default slices;
