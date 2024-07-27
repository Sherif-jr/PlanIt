import AsyncStorage from "@react-native-async-storage/async-storage";
import { Middleware } from "@reduxjs/toolkit";
import { StoreState } from "../slices";
import { LocalStorageKeys } from "@/constants/Enums";

export const persistStore: Middleware<{}, StoreState> =
  ({ getState }) =>
  (next) =>
  async (action) => {
    let result = next(action);
    try {
      const state = getState();
      const tasks = state.tasks.taskLists;
      const labels = state.tasks.labels;
      const config = state.config;

      //save the state to the local storage on update
      await Promise.all([
        AsyncStorage.setItem(LocalStorageKeys.TASKLISTS, JSON.stringify(tasks)),
        AsyncStorage.setItem(LocalStorageKeys.LABELS, JSON.stringify(labels)),
        AsyncStorage.setItem(LocalStorageKeys.CONFIG, JSON.stringify(config)),
      ]);
    } catch (error) {
      console.error("Failed to save cart to Async storage:", error);
    }
    return result;
  };
