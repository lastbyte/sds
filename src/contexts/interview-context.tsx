import { useState, useCallback } from "react";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";

export interface InterviewState {
  isSolution: boolean;
  isDialogOpen: boolean;
  showSolutionButton: boolean;
  isEvaluationDialogOpen: boolean;
  isProgressDialogOpen?: boolean;
  localCopy: ExcalidrawInitialDataState | null;
  solutionData: ExcalidrawInitialDataState | null;
  isLoading: boolean;
  resetCounter: number;
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
  loadSolutionData: (slug: string) => Promise<void>;
  setSolutionData: (data: ExcalidrawInitialDataState | null) => void;
  setIsLoading: (loading: boolean) => void;
  incrementResetCounter: () => void;
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
  const [solutionData, setSolutionData] =
    useState<ExcalidrawInitialDataState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);

  // Helper functions for localStorage
  const getLocalStorageKey = (slug: string) => `excalidraw-data-${slug}`;

  const removeLocalCopy = useCallback((slug: string) => {
    try {
      localStorage.removeItem(getLocalStorageKey(slug));
      setLocalCopy(null);
    } catch (error) {
      console.error("Failed to remove from localStorage:", error);
    }
  }, []);

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

  const loadSolutionData = useCallback(async (slug: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/designs/${slug}.excalidraw`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Transform the excalidraw file data to the format expected by initialData
      const initialDataState: ExcalidrawInitialDataState = {
        elements: data.elements || [],
        appState: {
          ...data.appState,
          // Ensure collaborators is properly initialized
          collaborators: data.appState?.collaborators || new Map(),
        },
        files: data.files || {},
      };
      setSolutionData(initialDataState);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading Excalidraw data:", error);
      setIsLoading(false);
    }
  }, []);

  const incrementResetCounter = useCallback(() => {
    setResetCounter((prev) => prev + 1);
  }, []);

  return {
    state: {
      isSolution,
      isDialogOpen,
      showSolutionButton,
      isEvaluationDialogOpen,
      isProgressDialogOpen,
      localCopy,
      solutionData,
      isLoading,
      resetCounter,
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
      loadSolutionData,
      setSolutionData,
      setIsLoading,
      incrementResetCounter,
      removeLocalCopy,
    },
  };
}
