import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";

export function getBoardDataForSlug(
  slug: string
): Promise<ExcalidrawInitialDataState> {
  return fetch(`/designs/${slug}.excalidraw`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch board data");
    }
    return res.json();
  });
}
