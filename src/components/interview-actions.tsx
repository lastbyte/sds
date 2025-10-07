import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppDispatch, type RootState } from "@/store";
import { incrementRefreshCounter, setBoardData, setConfirmEvaluation, setConfirmResetBoard, setConfirmViewSolution } from "@/store/slices/interview";
import { ClipboardCheckIcon, EyeIcon, RefreshCcwIcon, RotateCcwIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PromptBox } from "./prompt-box";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import useMobile from "@/hooks/use-mobile";

export default function InterviewActions() {

    const interviewState = useSelector((state: RootState) => state.interview);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const mobile = useMobile();
    return (<>
    {/* Evaluation Dialog - separate from dropdown */}
        <Dialog
          open={interviewState.confirmEvaluation}
          onOpenChange={(open) => dispatch(setConfirmEvaluation(open))}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Follow the following steps to evaluate your solution.
              </DialogTitle>
              <ul className="list-decimal flex flex-col gap-4 p-2">
                <li>Export your design as an image.</li>
                <li>
                  <PromptBox />
                </li>
                <li>
                  Copy the prompt above and attach the image into any AI tool
                  like ChatGPT, Bing Chat, or Claude.
                </li>
              </ul>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => dispatch(setConfirmEvaluation(false))}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* clear progress Dialog -separate from dropdown */}
        <Dialog
          open={interviewState.confirmResetBoard}
          onOpenChange={(open) => dispatch(setConfirmResetBoard(open))}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to reset the board?
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              This action will reset the board to its initial state. Once
              deleted, your changes cannot be recovered.
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => dispatch(setConfirmResetBoard(false))}
              >
                Close
              </Button>
              <Button
                variant="default"
                size="sm"
                className="cursor-pointer"
                onClick={() => {
                  dispatch(
                    setBoardData({
                      elements: [],
                      appState: {},
                      files: {},
                    })
                  );
                  dispatch(setConfirmResetBoard(false));
                  dispatch(incrementRefreshCounter());
                }}
              >
                <RefreshCcwIcon className="w-4 h-4 mr-2" />
                Reset Board
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* clear progress Dialog -separate from dropdown */}
        <Dialog
          open={interviewState.confirmViewSolution}
          onOpenChange={(open) => dispatch(setConfirmViewSolution(open))}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to view the solution?
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Viewing the solution will take away the fun of solving the
              problem yourself. Are you sure you want to proceed?
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => dispatch(setConfirmViewSolution(false))}
              >
                Close
              </Button>
              <Button
                variant="default"
                size="sm"
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setConfirmViewSolution(false));
                  navigate("/whiteboard/" + interviewState.slug);
                }}
              >
                <EyeIcon className="w-4 h-4 mr-1" />
                View Solution
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className={`absolute ${mobile ? "bottom-20 right-0" : "right-4 bottom-4"} z-10`}>
          <ButtonGroup className="bg-secondary text-secondary-foreground rounded-sm"
          orientation={mobile ? "vertical" : "horizontal"}
          >
            <Tooltip>
              <TooltipTrigger className="cursor-pointer p-2 px-3 first:rounded-tl-sm first:rounded-bl-sm last:rounded-tr-sm last:rounded-br-sm ">
                  <EyeIcon className="h-4 w-4" onClick={() => dispatch(setConfirmViewSolution(true))} />
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                View Solution
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer p-2 px-3 first:rounded-tl-sm first:rounded-bl-sm last:rounded-tr-sm last:rounded-br-sm ">
                  <RotateCcwIcon className="h-4 w-4" onClick={() => dispatch(setConfirmResetBoard(true))} />
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Reset Board
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer p-2 px-3 first:rounded-tl-sm first:rounded-bl-sm last:rounded-tr-sm last:rounded-br-sm ">
                <ClipboardCheckIcon className="h-4 w-4" onClick={() => dispatch(setConfirmEvaluation(true))} />
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                {interviewState.confirmEvaluation
                  ? "Hide Evaluation"
                  : "View Evaluation Steps"}
              </TooltipContent>
            </Tooltip>
          </ButtonGroup>
        </div>
    </>);
}