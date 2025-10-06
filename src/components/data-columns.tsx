import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom";

export type ListItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
};

export const columns: ColumnDef<ListItem>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <span className="px-4">ID</span>;
    },
    cell: ({ row }) => (
      <div className="text-gray-500 px-4">{row.getValue("id")}</div>
    ),
    size: 50,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <span>Title</span>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:text-blue-500 hover:bg-transparent cursor-pointer"
          >
            <ArrowUpDown
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            />
          </Button>
        </div>
      );
    },
    minSize: 150,
    maxSize: 500,
    cell: ({ row }) => (
      <div className="flex flex-col cursor-pointer">
        <Link
          to={`/whiteboard/${row.original.slug}`}
          className="text-ellipsis overflow-hidden whitespace-nowrap"
        >
          <div className="font-medium">{row.getValue("title") as string}</div>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-gray-600 cursor-pointer">
                {row.original.description as string}
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[200px]">
              <div className="h-fit w-full">
                {row.original.description as string}
              </div>
            </TooltipContent>
          </Tooltip>
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "difficulty",
    header: () => <div className="text-center">Difficulty</div>,
    size: 100,
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
            className={`inline-block rounded-md px-2 py-1 text-xs font-medium capitalize ${colorClass}`}
          >
            {difficulty}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "tags",
    size: 150,
    header: () => <div className="text-left">Tags</div>,
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];

      return (
        <div className="text-left flex flex-wrap justify-start gap-2 h-fit items-center">
          {tags.map((tag) => (
            <span
              key={tag}
              className="h-fit inline-block rounded-full bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 text-[10px] font-medium text-gray-700 dark:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    },
  },
];
