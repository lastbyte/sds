import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as ls from "@/services/localstorage";

export interface InterviewState {
  slug: string | null;
  isLoading: boolean;
  boardData: ExcalidrawInitialDataState | null; // URL or base64 string of the current board image
  confirmViewSolution: boolean;
  confirmResetBoard: boolean;
  confirmEvaluation?: boolean;
  refreshCounter: number; // To trigger re-render of Excalidraw component
}

const initialState: InterviewState = {
  slug: null,
  isLoading: false,
  boardData: null,
  confirmViewSolution: false,
  confirmResetBoard: false,
  confirmEvaluation: false,
  refreshCounter: 0,
};

export const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setSlug: (state: InterviewState, action: PayloadAction<string | null>) => {
      state.slug = action.payload;
    },
    setIsLoading: (state: InterviewState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBoardData: (
      state: InterviewState,
      action: PayloadAction<ExcalidrawInitialDataState | null>
    ) => {
      state.boardData = action.payload;
      // Save to localStorage
      if (action.payload) {
        ls.setBoardData(state.slug || "", action.payload);
      }
    },
    setConfirmViewSolution: (
      state: InterviewState,
      action: PayloadAction<boolean>
    ) => {
      state.confirmViewSolution = action.payload;
    },
    setConfirmResetBoard: (
      state: InterviewState,
      action: PayloadAction<boolean>
    ) => {
      state.confirmResetBoard = action.payload;
    },
    setConfirmEvaluation: (
      state: InterviewState,
      action: PayloadAction<boolean>
    ) => {
      state.confirmEvaluation = action.payload;
    },
    incrementRefreshCounter: (state: InterviewState) => {
      state.refreshCounter += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSlug,
  setIsLoading,
  setBoardData,
  setConfirmViewSolution,
  setConfirmResetBoard,
  setConfirmEvaluation,
  incrementRefreshCounter,
} = interviewSlice.actions;

export default interviewSlice.reducer;
