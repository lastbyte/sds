import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";

const getBoardKey = (slug: string) => `boardData-${slug}`;

export function getBoardData(slug: string): ExcalidrawInitialDataState | null {
  const data = localStorage.getItem(getBoardKey(slug));
  //sanatize for excalidraw
  if (data) {
    const jsonData = JSON.parse(data);
    try {
      return {
        ...jsonData,
        // Ensure files is an object
        files: jsonData.files || {},
        // Ensure elements is an array
        elements: Array.isArray(jsonData.elements) ? jsonData.elements : [],
        // Ensure appState is an object
        appState: jsonData.appState ? {
          ...jsonData.appState,
          collaborators: jsonData.appState.collaborators
            ? new Map(Object.entries(jsonData.appState.collaborators))
            : new Map(),
        } : {
          collaborators: new Map(),
        },
      }
    } catch (error) {
      console.error("Error parsing board data:", error);
    }
  }
  return null;
}

export function setBoardData(slug: string, data: ExcalidrawInitialDataState) {
  localStorage.setItem(getBoardKey(slug), JSON.stringify(data));
}
export function clearBoardData(slug: string) {
  localStorage.removeItem(getBoardKey(slug));
}
