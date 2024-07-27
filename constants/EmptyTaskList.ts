import { TaskList } from "@/types/Task";

const emptyTaskList: Omit<TaskList, "id"> = {
  title: "",
  tasks: [],
  pinned: false,
};
export default emptyTaskList;
