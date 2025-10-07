import { useInterviewState } from "@/contexts/interview-context";
import { FileTextIcon } from "lucide-react";
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
        className="cursor-pointer text-xs sm:text-sm"
        asChild
      >
        <div className="flex items-center">
          <FileTextIcon className="h-4 w-4 sm:h-3 sm:w-3" />
        <span className="hidden sm:text-sm sm:inline ml-1">Solution</span>
        </div>
      </Button>
    </Link>
  );
}
