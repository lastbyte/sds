import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { setIsOpenTopicDialogVisible } from "@/store/slices/config";
import type { CellContext } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import type { ListItem } from "./data-columns";
import { useAppDispatch } from "@/store";
import { setSlug } from "@/store/slices/interview";

export default function CellTitle({ row }: CellContext<ListItem, unknown>) {
  const dispatch = useAppDispatch();
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
    <div
      className="flex flex-col cursor-pointer"
      onClick={() => {
        dispatch(setSlug(row.original.slug));
        dispatch(setIsOpenTopicDialogVisible(true));
      }}
    >
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
  );
}
