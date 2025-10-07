import { useState, useCallback } from "react";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";

export interface InterviewState {
  isSolution: boolean;
  isDialogOpen: boolean;
  showSolutionButton: boolean;
  isEvaluationDialogOpen: boolean;
  isProgressDialogOpen?: boolean;
  localCopy: ExcalidrawInitialDataState | null;
}

export interface InterviewActions {
  setIsSolution: (value: boolean) => void;
  setIsDialogOpen: (value: boolean) => void;
  setShowSolutionButton: (value: boolean) => void;
  setIsEvaluationDialogOpen: (value: boolean) => void;
  setIsProgressDialogOpen: (value: boolean) => void;
  loadLocalCopy: (slug: string) => ExcalidrawInitialDataState | null;
  saveLocalCopy: (data: ExcalidrawInitialDataState, slug: string) => void;
  updateLocalCopy: (data: ExcalidrawInitialDataState) => void;
}

export function useInterviewState() {
  const [isSolution, setIsSolution] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEvaluationDialogOpen, setIsEvaluationDialogOpen] = useState(false);
  const [showSolutionButton, setShowSolutionButton] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [localCopy, setLocalCopy] = useState<ExcalidrawInitialDataState | null>(
    null
  );

  // Helper functions for localStorage
  const getLocalStorageKey = (slug: string) => `excalidraw-data-${slug}`;

  const loadLocalCopy = useCallback(
    (slug: string): ExcalidrawInitialDataState | null => {
      try {
        const saved = localStorage.getItem(getLocalStorageKey(slug));
        if (!saved) return null;

        const savedData = JSON.parse(saved);

        // Ensure appState has required properties to avoid errors
        const sanitizedData: ExcalidrawInitialDataState = {
          ...savedData,
          appState: {
            ...savedData.appState,
            // Convert collaborators back to Map if it was saved as Object, or ensure it's proper format
            collaborators: savedData.appState?.collaborators
              ? savedData.appState.collaborators instanceof Map
                ? savedData.appState.collaborators
                : new Map(
                    Object.entries(savedData.appState.collaborators || {})
                  )
              : new Map(),
          },
        };

        setLocalCopy(sanitizedData);
        return sanitizedData;
      } catch (error) {
        console.error("Failed to load from localStorage:", error);
        return null;
      }
    },
    []
  );

  const saveLocalCopy = useCallback(
    (data: ExcalidrawInitialDataState, slug: string) => {
      try {
        // Sanitize appState before saving to localStorage
        const sanitizedAppState = {
          ...data.appState,
          // Convert Map to Object for JSON serialization, or ensure it's an array
          collaborators:
            data.appState?.collaborators instanceof Map
              ? Object.fromEntries(data.appState.collaborators)
              : data.appState?.collaborators || {},
        };

        const sanitizedData = {
          ...data,
          appState: sanitizedAppState,
        };

        localStorage.setItem(
          getLocalStorageKey(slug),
          JSON.stringify(sanitizedData)
        );
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    },
    []
  );

  const updateLocalCopy = useCallback((data: ExcalidrawInitialDataState) => {
    setLocalCopy(data);
  }, []);

  return {
    state: {
      isSolution,
      isDialogOpen,
      showSolutionButton,
      isEvaluationDialogOpen,
      isProgressDialogOpen,
      localCopy,
    },
    actions: {
      setIsSolution,
      setIsDialogOpen,
      setShowSolutionButton,
      setIsEvaluationDialogOpen,
      setIsProgressDialogOpen,
      loadLocalCopy,
      saveLocalCopy,
      updateLocalCopy,
    },
  };
}
