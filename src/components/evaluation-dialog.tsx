import { setConfirmEvaluation } from "@/store/slices/interview";
import { CheckCircle2Icon } from "lucide-react";
import { PromptBox } from "./prompt-box";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { useSelector } from "react-redux";
import { type RootState, useAppDispatch } from "@/store";

export default function EvaluationDialog() {
  const interviewState = useSelector((state: RootState) => state.interview);
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={interviewState.confirmEvaluation}
      onOpenChange={(open) => dispatch(setConfirmEvaluation(open))}
    >
      <DialogContent>
        <DialogTitle>Evaluate Your Solution</DialogTitle>
        <DialogDescription>
          Use the prompt below to evaluate your solution. You can copy it to
          your clipboard and paste it into the AI model of your choice. You can
          also modify the prompt to better suit your needs. The more specific
          you are, the better the evaluation will be.
        </DialogDescription>
        <div className="flex flex-col gap-4 p-2">
          <Alert variant="default">
            <CheckCircle2Icon />
            <AlertTitle className="h-fit">Important Note:</AlertTitle>
            <AlertDescription>
              Don't forget to attach the image to the prompt. <br />
              You can export the board as an image using the Excalidraw menu
              (top-left hamburger menu)
            </AlertDescription>
          </Alert>
          <PromptBox />
        </div>
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
  );
}
