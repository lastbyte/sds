import InterviewActions from "@/components/interview-actions";
import { getBoardData } from "@/services/localstorage";
import { useAppDispatch, type RootState } from "@/store";
import {
  setBoardData,
  setSlug,
} from "@/store/slices/interview";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Interview() {
  const theme = useSelector((state: RootState) => state.config.theme);
  const [boardInitialData, setBoardInitialData] =
    useState<ExcalidrawInitialDataState | null>(null);
  const params = useParams();

  // Use interview context for all state management
  const interviewState = useSelector((state: RootState) => state.interview);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSlug(params.slug || null));
    // board Data
    const boardData = getBoardData(params.slug || "");
    setBoardInitialData(boardData);
  }, [params.slug, dispatch, theme]);

  // Handle Excalidraw onChange event
  const handleExcalidrawChange = useCallback(
    (
      elements: readonly NonNullable<
        ExcalidrawInitialDataState["elements"]
      >[number][],
      appState: NonNullable<ExcalidrawInitialDataState["appState"]>,
      files: NonNullable<ExcalidrawInitialDataState["files"]>
    ) => {
      if (!interviewState.slug) return;
      dispatch(setBoardData(JSON.parse(JSON.stringify({elements, appState, files}))));
    },
    [dispatch, interviewState.slug]
  );

  if (interviewState.slug !== params.slug) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>Loading board...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <InterviewActions />
      <div>
          <div className="w-full whiteboard">
            <Excalidraw
              key={`blank-${params.slug}-${theme}-${interviewState.refreshCounter}`}
              theme={theme === "dark" ? "dark" : "light"}
              initialData={boardInitialData}
              onChange={handleExcalidrawChange}
            />
          </div>
      </div>
    </div>
  );
}
