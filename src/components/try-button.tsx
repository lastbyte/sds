import { useInterviewState } from "@/contexts/interview-context";
import { LockOpenIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function TryButton({ slug }: { slug: string }) {
  const { actions } = useInterviewState();
  const { setIsSolution } = actions;

  const handleClick = () => {
    // Reset to drawing mode when navigating to interview
    setIsSolution(false);
  };

  return (
    <Link to={`/whiteboard/${slug}`} onClick={handleClick}>
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm"
      >
        <LockOpenIcon className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline ml-1">Solution</span>
      </Button>
    </Link>
  );
}
