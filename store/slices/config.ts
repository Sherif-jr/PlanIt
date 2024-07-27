import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IConfigState {
  notifyTime: string;
  theme: "dark" | "light" | "system";
  firstTime?: boolean;
}

const DEFAULT_STATE: IConfigState = {
  notifyTime: "20:00",
  theme: "system",
  firstTime: false,
};

const configSlice = createSlice({
  name: "config",
  initialState: DEFAULT_STATE,
  reducers: {
    setNotifyTime: (state, action: PayloadAction<string>) => {
      state.notifyTime = action.payload;
    },
    setTheme: (state, action: PayloadAction<"dark" | "light" | "system">) => {
      state.theme = action.payload;
    },
    setConfig: (state, action: PayloadAction<IConfigState>) => {
      state.theme = action.payload.theme;
      state.notifyTime = action.payload.notifyTime;
      state.firstTime = action.payload.firstTime || false;
    },
  },
});

export const { setNotifyTime, setTheme, setConfig } = configSlice.actions;

const configReducer = configSlice.reducer;
export default configReducer;
