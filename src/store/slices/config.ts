import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ConfigState {
  theme: "light" | "dark";
  isOpenTopicDialogVisible: boolean;
}

// Get initial theme from localStorage or default to light
const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";

  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  if (savedTheme) return savedTheme;

  // Check system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const initialState: ConfigState = {
  theme: getInitialTheme(),
  isOpenTopicDialogVisible: false,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setIsOpenTopicDialogVisible: (state, action: PayloadAction<boolean>) => {
      state.isOpenTopicDialogVisible = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme, setIsOpenTopicDialogVisible } = configSlice.actions;

export default configSlice.reducer;
