import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useMobile from "@/hooks/use-mobile";
import { useAppDispatch, type RootState } from "@/store";
import {
  setConfirmEvaluation,
  setConfirmResetBoard,
  setConfirmViewSolution,
} from "@/store/slices/interview";
import { ClipboardCheckIcon, EyeIcon, RotateCcwIcon } from "lucide-react";
import { useSelector } from "react-redux";
import EvaluationDialog from "./evaluation-dialog";
import ResetBoardDialog from "./reset-board-dialog";
import SolutionDialog from "./solution-dialog";
import { ButtonGroup } from "./ui/button-group";

export default function InterviewActions() {
  const interviewState = useSelector((state: RootState) => state.interview);
  const dispatch = useAppDispatch();
  const mobile = useMobile();
  return (
    <>
      {/* Evaluation Dialog - separate from dropdown */}
      <EvaluationDialog />

      {/* clear progress Dialog -separate from dropdown */}
      <ResetBoardDialog />

      {/* clear progress Dialog -separate from dropdown */}
      <SolutionDialog />
      <div
        className={`absolute ${
          mobile ? "bottom-20 right-0" : "right-4 bottom-4"
        } z-10`}
      >
        <ButtonGroup
          className="bg-secondary text-secondary-foreground rounded-sm"
          orientation={mobile ? "vertical" : "horizontal"}
        >
          <Tooltip>
            <TooltipTrigger className="cursor-pointer p-2 px-3 first:rounded-tl-sm first:rounded-bl-sm last:rounded-tr-sm last:rounded-br-sm ">
              <EyeIcon
                className="h-4 w-4"
                onClick={() => dispatch(setConfirmViewSolution(true))}
              />
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              View Solution
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer p-2 px-3 first:rounded-tl-sm first:rounded-bl-sm last:rounded-tr-sm last:rounded-br-sm ">
              <RotateCcwIcon
                className="h-4 w-4"
                onClick={() => dispatch(setConfirmResetBoard(true))}
              />
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              Reset Board
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer p-2 px-3 first:rounded-tl-sm first:rounded-bl-sm last:rounded-tr-sm last:rounded-br-sm ">
              <ClipboardCheckIcon
                className="h-4 w-4"
                onClick={() => dispatch(setConfirmEvaluation(true))}
              />
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              {interviewState.confirmEvaluation
                ? "Hide Evaluation"
                : "View Evaluation Steps"}
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </div>
    </>
  );
}
