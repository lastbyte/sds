import type { RootState } from "@/store";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useInterviewState } from "@/contexts/interview-context";

interface InterviewProps {
  isSolution: boolean;
  setIsSolution: (value: boolean) => void;
}

export default function Interview({ isSolution }: InterviewProps) {
  const [solutionData, setSolutionData] =
    useState<ExcalidrawInitialDataState | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const theme = useSelector((state: RootState) => state.config.theme);

  const params = useParams();

  // Use interview context for localStorage handling
  const { state, actions } = useInterviewState();
  const { localCopy } = state;
  const { loadLocalCopy, saveLocalCopy, updateLocalCopy } = actions;

  // Handle Excalidraw onChange event
  const handleExcalidrawChange = useCallback(
    (
      elements: readonly NonNullable<
        ExcalidrawInitialDataState["elements"]
      >[number][],
      appState: NonNullable<ExcalidrawInitialDataState["appState"]>,
      files: NonNullable<ExcalidrawInitialDataState["files"]>
    ) => {
      if (!params.slug) return;

      const updatedData: ExcalidrawInitialDataState = {
        elements: [...elements],
        appState,
        files: files || {},
      };

      updateLocalCopy(updatedData);

      // Debounce saving to localStorage
      const timeoutId = setTimeout(() => {
        saveLocalCopy(updatedData, params.slug!);
      }, 1000);

      return () => clearTimeout(timeoutId);
    },
    [params.slug, saveLocalCopy, updateLocalCopy]
  );

  useEffect(() => {
    // Load initial data from localStorage first, then fallback to excalidraw file
    if (params.slug) {
      console.log("Loading design for slug:", params.slug);

      // Try to load from localStorage first
      const savedData = loadLocalCopy(params.slug);
      if (savedData) {
        console.log("Loaded data from localStorage:", savedData);
        setIsLoading(false);
        return;
      }

      // Fallback to loading from public folder
      fetch(`/designs/${params.slug}.excalidraw`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Loaded Excalidraw data from file:", data);
          console.log("Elements count:", data.elements?.length || 0);
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
          // Don't set localCopy here - it should remain null if no saved work exists
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error loading Excalidraw data:", error);
          setIsLoading(false);
        });
    } else {
      console.log("No slug provided");
      setIsLoading(false);
    }
  }, [params.slug, theme, loadLocalCopy]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>Loading board...</div>
      </div>
    );
  }

  return (
    <div className="w-full whiteboard relative">
      <div style={{ height: "calc(100vh - 60px)" }}>
        {isSolution === true ? (
          <div className="w-full h-full">
            {solutionData ? (
              <Excalidraw
                initialData={solutionData}
                viewModeEnabled={true}
                key={`solution-${params.slug}-${isSolution}-${theme}`}
                theme={theme === "dark" ? "dark" : "light"}
                UIOptions={{
                  canvasActions: {
                    loadScene: false,
                    saveAsImage: true,
                    export: {
                      saveFileToDisk: true,
                    },
                  },
                }}
                zenModeEnabled={true}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-4xl font-saira">
                  WIP, will be available soon!
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full">
            <Excalidraw
              key={`blank-${params.slug}-${isSolution}-${theme}`}
              theme={theme === "dark" ? "dark" : "light"}
              initialData={localCopy}
              onChange={handleExcalidrawChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
