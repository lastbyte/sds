import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addHeadingAndDescriptionToBoard(
  elements: ExcalidrawInitialDataState["elements"],
  headingText: string,
  descriptionText: string
) {
  if (!elements) return elements;
  const heading = {
    type: "text",
    version: 141,
    versionNonce: 361174001,
    isDeleted: false,
    id: "heading",
    fillStyle: "hachure",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    angle: 0,
    x: 50,
    y: 20,
    height: 40,
    width: 400,
    strokeColor: "#000000",
    backgroundColor: "transparent",
    seed: 1968410316,
    groupIds: [],
    roundness: null,
    text: headingText,
    fontSize: 32,
    fontFamily: 1,
    textAlign: "left",
    verticalAlign: "top",
    baselineOffset: 7,
    originalText: headingText,
  } as const;

  const description = {
    type: "text",
    version: 141,
    versionNonce: 361174001,
    isDeleted: false,
    id: "description",
    fillStyle: "hachure",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    angle: 0,
    x: 50,
    y: 70,
    height: 60,
    width: 600,
    strokeColor: "#000000",
    backgroundColor: "transparent",
    seed: 1968410316,
    groupIds: [],
    roundness: null,
    text: descriptionText,
    fontSize: 20,
    fontFamily: 1,
    textAlign: "left",
    verticalAlign: "top",
    baselineOffset: 6,
    originalText: descriptionText,
  } as const;

  const extras = [];
  if (!elements.find((el) => el.id === "heading")) {
    extras.push(heading);
  }
  if (!elements.find((el) => el.id === "description")) {
    extras.push(description);
  }
  return [...extras, ...elements];
}
