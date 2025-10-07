import { useState } from "react";

export interface InterviewState {
  isSolution: boolean;
  isDialogOpen: boolean;
  showSolutionButton: boolean;
  isEvaluationDialogOpen: boolean;
}

export interface InterviewActions {
  setIsSolution: (value: boolean) => void;
  setIsDialogOpen: (value: boolean) => void;
  setShowSolutionButton: (value: boolean) => void;
  setIsEvaluationDialogOpen: (value: boolean) => void;
}

export function useInterviewState() {
  const [isSolution, setIsSolution] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEvaluationDialogOpen, setIsEvaluationDialogOpen] = useState(false);
  const [showSolutionButton, setShowSolutionButton] = useState(false);

  return {
    state: {
      isSolution,
      isDialogOpen,
      showSolutionButton,
      isEvaluationDialogOpen,
    },
    actions: {
      setIsSolution,
      setIsDialogOpen,
      setShowSolutionButton,
      setIsEvaluationDialogOpen,
    },
  };
}
