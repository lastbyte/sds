import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";
import { useEffect, useState } from "react";

export default function Whiteboard() {
  const [initialData, setInitialData] =
    useState<ExcalidrawInitialDataState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial data from the excalidraw file in public folder
    fetch("/uber.excalidraw")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Loaded Excalidraw data:", data);
        // Transform the excalidraw file data to the format expected by initialData
        const initialDataState: ExcalidrawInitialDataState = {
          elements: data.elements || [],
          appState: data.appState || {},
          files: data.files || {},
        };
        setInitialData(initialDataState);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading Excalidraw data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>Loading Excalidraw...</div>
      </div>
    );
  }

  return (
    <div className="w-full whiteboard">
      <Excalidraw
        initialData={initialData}
        viewModeEnabled={true}
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
    </div>
  );
}
