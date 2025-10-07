import type { CellContext } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import type { ListItem } from "./data-columns";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function CellTitle({ row }: CellContext<ListItem, unknown>) {
  const navigate = useNavigate();
  return row.original.practice != true ? (
    <div className="flex flex-col cursor-pointer">
      <Link to={`/whiteboard/${row.original.slug}`}>
        <div className="font-medium text-xs sm:text-sm truncate">
          {row.getValue("title") as string}
        </div>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="w-full">
            <div className="text-gray-600 cursor-pointer text-xs sm:text-sm truncate">
              {row.original.description as string}
            </div>
          </TooltipTrigger>
          <TooltipContent className="text-center text-xs sm:text-sm w-[220px]">
            {row.original.description as string}
          </TooltipContent>
        </Tooltip>
      </Link>
    </div>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col cursor-pointer">
          <div className="font-medium text-xs sm:text-sm truncate">
            {row.getValue("title") as string}
          </div>
          <Tooltip delayDuration={100}>
            <TooltipTrigger className="w-full">
              <div className="text-gray-600 cursor-pointer text-xs sm:text-sm truncate">
                {row.original.description as string}
              </div>
            </TooltipTrigger>
            <TooltipContent className="text-center text-xs sm:text-sm w-[220px]">
              {row.original.description as string}
            </TooltipContent>
          </Tooltip>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Choose an Option</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          It looks like this is a practice question. You can either view the
          solution or try it out on the whiteboard.
        </p>
        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => navigate(`/whiteboard/${row.original.slug}`)}
          >
            View Solution
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => navigate(`/interview/${row.original.slug}`)}
          >
            Try it out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
