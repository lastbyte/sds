import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ViewActionButton from "./view-action-button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import CellTitle from "./cell-title";

export type ListItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  practice?: boolean;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
};

export const columns: ColumnDef<ListItem>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <span className="px-2 sm:px-4 text-xs sm:text-sm">ID</span>;
    },
    cell: ({ row }) => (
      <div className="text-gray-500 px-2 sm:px-4 text-xs sm:text-sm">
        {row.getValue("id")}
      </div>
    ),
    size: 40,
  },
  {
    accessorKey: "title",
    header: function ({ column }) {
      return (
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-xs sm:text-sm">Title</span>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:text-blue-500 hover:bg-transparent cursor-pointer h-6 w-6 sm:h-8 sm:w-8"
          >
            <ArrowUpDown
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-3 w-3 sm:h-4 sm:w-4"
            />
          </Button>
        </div>
      );
    },
    minSize: 120,
    cell: CellTitle,
  },
  {
    accessorKey: "difficulty",
    header: () => (
      <div className="text-center text-xs sm:text-sm">Difficulty</div>
    ),
    size: 80,
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string;
      const colorClass =
        {
          easy: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
          medium:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
          hard: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
        }[difficulty] || "bg-gray-100 text-gray-800";

      return (
        <div className="flex justify-center">
          <span
            className={`inline-block rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium capitalize ${colorClass}`}
          >
            <span className="hidden sm:inline">{difficulty}</span>
            <span className="sm:hidden">
              {difficulty.charAt(0).toUpperCase()}
            </span>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "tags",
    size: 120,
    header: () => <div className="text-left text-xs sm:text-sm">Tags</div>,
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];

      return (
        <div className="text-left flex flex-wrap justify-start gap-1 sm:gap-2 h-fit items-center">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="h-fit inline-block rounded-full bg-gray-200 dark:bg-gray-700 px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[10px] font-medium text-gray-700 dark:text-gray-200"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="text-[8px] sm:text-[10px] text-gray-500">
              +{tags.length - 4}
            </span>
          )}
        </div>
      );
    },
  },
];
