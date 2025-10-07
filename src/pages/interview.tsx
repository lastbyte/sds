import type { RootState } from "@/store";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    // Load initial data from the excalidraw file in public folder
    if (params.slug) {
      console.log("Loading design for slug:", params.slug);
      fetch(`/designs/${params.slug}.excalidraw`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Loaded Excalidraw data:", data);
          console.log("Elements count:", data.elements?.length || 0);
          // Transform the excalidraw file data to the format expected by initialData
          const initialDataState: ExcalidrawInitialDataState = {
            elements: data.elements || [],
            appState: {
              ...data.appState,
              // Let Excalidraw handle theme colors automatically
            },
            files: data.files || {},
          };
          setSolutionData(initialDataState);
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
  }, [params.slug, theme]);

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
            />
          </div>
        )}
      </div>
    </div>
  );
}
