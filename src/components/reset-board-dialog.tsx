import { type RootState, useAppDispatch } from "@/store";
import {
  incrementRefreshCounter,
  setBoardData,
  setConfirmResetBoard,
} from "@/store/slices/interview";
import { RefreshCcwIcon } from "lucide-react";
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

export default function ResetBoardDialog() {
  const interviewState = useSelector((state: RootState) => state.interview);
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={interviewState.confirmResetBoard}
      onOpenChange={(open) => dispatch(setConfirmResetBoard(open))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to reset the board?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action will reset the board to its initial state. Once deleted,
          your changes cannot be recovered.
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
  );
}
