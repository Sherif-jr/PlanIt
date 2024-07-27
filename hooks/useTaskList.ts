import { StoreState } from "@/store/slices";
import {
  addTaskList as addTaskListAction,
  updateTaskList as updateTaskListAction,
  deleteTaskList as deleteTaskListAction,
  setTaskLists as setTaskListsAction,
  addLabel as addLabelAction,
  updateLabel as updateLabelAction,
  deleteLabel as deleteLabelAction,
  setLabels as setLabelsAction,
} from "@/store/slices/tasks";
import { Label, Task, TaskList } from "@/types/Task";
import { useDispatch, useSelector } from "react-redux";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import emptyTaskList from "@/constants/EmptyTaskList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { LocalStorageKeys } from "@/constants/Enums";
import {
  cancelScheduledNotification,
  schedulePushNotification,
} from "@/helpers/handleLocalNotification";
import { getDateInTime } from "@/helpers/utils";

const useTaskList = () => {
  const taskLists = useSelector((state: StoreState) => state.tasks.taskLists);
  const labels = useSelector((state: StoreState) => state.tasks.labels);
  const notifyTime = useSelector(
    (state: StoreState) => state.config.notifyTime
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTaskLists = async () => {
      try {
        const localTaskLists = await AsyncStorage.getItem(
          LocalStorageKeys.TASKLISTS
        );

        // console.log({ localTaskLists });
        const localLabels = await AsyncStorage.getItem(LocalStorageKeys.LABELS);
        // console.log({ localLabels });

        if (localTaskLists) {
          setTaskLists(JSON.parse(localTaskLists) || []);
        }
        if (localLabels) {
          setLabels(JSON.parse(localLabels) || []);
        }
      } catch (e) {
        console.log(e);
      }
    };

    //initialize
    if (!taskLists.length) {
      fetchTaskLists();
    }
  }, []);

  const createTaskList = (taskList: Omit<TaskList, "id">) => {
    const newTaskList: TaskList = {
      id: uuidv4(),
      ...taskList,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addTaskListAction(newTaskList));
    return newTaskList;
  };
  const updateTaskList = (taskList: TaskList) => {
    const newTaskList = {
      ...taskList,
      updatedAt: new Date().toISOString(),
    };
    dispatch(updateTaskListAction(newTaskList));
    return newTaskList;
  };
  const deleteTaskList = (taskListID: string) => {
    dispatch(deleteTaskListAction(taskListID));
  };
  const setTaskLists = (taskLists: TaskList[]) => {
    dispatch(setTaskListsAction(taskLists));
  };

  /**
   * Create or update a task list based on the input
   * @param taskList
   * @returns taskList
   */
  const saveTaskList = (
    taskList: Omit<TaskList, "id" | "updatedAt" | "createdAt"> & {
      id?: string | null;
    }
  ) => {
    if (taskList.id) {
      return updateTaskList(taskList as TaskList);
    } else {
      return createTaskList(taskList as Omit<TaskList, "id">);
    }
  };

  const getTaskListByID = (id: string) => {
    return taskLists.find((taskList) => taskList.id === id) || null;
  };

  const addTaskToTaskList = (task: Omit<Task, "id">, taskListID?: string) => {
    if (taskListID) {
      let taskList = getTaskListByID(taskListID);
      if (taskList) {
        const newTask: Task = {
          id: uuidv4(),
          ...task,
        };
        const newTasks = [...taskList.tasks, newTask];
        const newTaskList = { ...taskList, tasks: newTasks };
        updateTaskList(newTaskList);
        return newTaskList;
      }
    } else {
      return createTaskList({
        ...emptyTaskList,
        tasks: [
          {
            id: uuidv4(),
            ...task,
          },
        ],
      });
    }
  };
  const addLabel = (label: Omit<Label, "id">) => {
    const newLabel: Label = {
      ...label,
      id: uuidv4(),
    };
    // console.log({ newLabel });

    dispatch(addLabelAction(newLabel));
  };
  const updateLabel = (label: Label) => {
    dispatch(updateLabelAction(label));
  };
  const deleteLabel = (labelID: string) => {
    dispatch(deleteLabelAction(labelID));
  };
  const setLabels = (labels: Label[]) => {
    dispatch(setLabelsAction(labels));
  };
  const getLabelByID = (id: string) => {
    return labels.find((label) => label.id === id) || null;
  };
  const saveLabel = (label: Omit<Label, "id"> & { id?: string | null }) => {
    if (label.id) {
      return updateLabel(label as Label);
    } else {
      return addLabel(label as Omit<Label, "id">);
    }
  };

  const enableNotification = async (taskListID: string) => {
    const taskList = getTaskListByID(taskListID);
    if (taskList) {
      const newTaskList = { ...taskList, notification: true };
      updateTaskList(newTaskList);
      await schedulePushNotification({
        identifier: taskListID,
        title: "Task List Reminder",
        body: "Don't forget to complete your task list!",
        trigger: {
          date: getDateInTime(taskList.date!, notifyTime),
        },
      });
      return newTaskList as TaskList;
    }
  };
  const disableNotification = async (taskListID: string) => {
    const taskList = getTaskListByID(taskListID);
    if (taskList) {
      const newTaskList = { ...taskList, notification: false };
      updateTaskList(newTaskList);
      await cancelScheduledNotification(taskListID);
      return newTaskList as TaskList;
    }
  };
  return {
    taskLists,
    labels,
    createTaskList,
    updateTaskList,
    deleteTaskList,
    saveTaskList,
    getTaskListByID,
    addTaskToTaskList,

    //labels
    addLabel,
    updateLabel,
    deleteLabel,
    setLabels,
    getLabelByID,
    saveLabel,

    //notification
    enableNotification,
    disableNotification,
  };
};

export default useTaskList;
