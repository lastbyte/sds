import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Whiteboard() {
  const [initialData, setInitialData] =
    useState<ExcalidrawInitialDataState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useSelector(
    (state: { config: { theme: string } }) => state.config.theme
  );

  const params = useParams();

  useEffect(() => {
    // Load initial data from the excalidraw file in public folder
    if (params.slug) {
      fetch(`/designs/${params.slug}.excalidraw`)
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
    }
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>Loading board...</div>
      </div>
    );
  }

  return (
    <div className="w-full whiteboard">
      {initialData === null ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-4xl font-saira">
            WIP, will be available soon!
          </div>
        </div>
      ) : (
        <Excalidraw
          initialData={initialData}
          viewModeEnabled={true}
          theme={theme}
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
      )}
    </div>
  );
}
