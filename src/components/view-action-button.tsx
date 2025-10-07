import { useInterviewState } from "@/contexts/interview-context";
import useMobile from "@/hooks/use-mobile";
import { FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ViewActionButton({ slug }: { slug: string }) {
  const { actions } = useInterviewState();
  const { setIsSolution } = actions;
  const mobile = useMobile();

  const handleClick = () => {
    // Reset to drawing mode when navigating to interview
    setIsSolution(false);
  };

  return (
    <Link to={`/whiteboard/${slug}`} onClick={handleClick}>
      <div className="flex items-center border-1 rounded-sm sm:py-2.5 sm:px-2.5 lg:py-2 lg:px-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
        <FileTextIcon size={mobile ? 10 : 16} />
        <span className="hidden sm:text-xs sm:inline ml-1">Solution</span>
      </div>
    </Link>
  );
}
