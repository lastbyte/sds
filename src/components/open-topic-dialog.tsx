import { type RootState, useAppDispatch } from "@/store";
import { setIsOpenTopicDialogVisible } from "@/store/slices/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function OpenTopicDialog() {
  const interviewState = useSelector((state: RootState) => state.interview);
  const configState = useSelector((state: RootState) => state.config);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Dialog
      open={configState.isOpenTopicDialogVisible}
      onOpenChange={(open) => dispatch(setIsOpenTopicDialogVisible(open))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Would you rather?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          solve this problem on the board from scratch or view the detailed
          solution quickly.
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => {
              dispatch(setIsOpenTopicDialogVisible(false));
              navigate(`/whiteboard/${interviewState.slug}`);
            }}
          >
            View Solution
          </Button>
          <Button
            variant="default"
            size="sm"
            className="cursor-pointer"
            onClick={() => {
              dispatch(setIsOpenTopicDialogVisible(false));
              navigate(`/interview/${interviewState.slug}`);
            }}
          >
            Try it out!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
