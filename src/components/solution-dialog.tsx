import { type RootState, useAppDispatch } from "@/store";
import { setConfirmViewSolution } from "@/store/slices/interview";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SolutionDialog() {
  const interviewState = useSelector((state: RootState) => state.interview);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Dialog
      open={interviewState.confirmViewSolution}
      onOpenChange={(open) => dispatch(setConfirmViewSolution(open))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to view the solution?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Viewing the solution will take away the fun of solving the problem
          yourself. Are you sure you want to proceed?
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
  );
}
