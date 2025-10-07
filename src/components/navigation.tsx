import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import type { RootState } from "@/store";
import { setTheme } from "@/store/slices/config";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  ClipboardCheckIcon,
  EyeIcon,
  EyeOffIcon,
  MenuIcon,
  MoonStarIcon,
  SunIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PromptBox } from "./prompt-box";

interface NavigationProps {
  showSolutionButton?: boolean;
  isSolution?: boolean;
  isDialogOpen?: boolean;
  isEvaluationDialogOpen?: boolean;
  onToggleSolution?: (show: boolean) => void;
  onDialogOpenChange?: (open: boolean) => void;
  onEvaluationDialogOpenChange?: (open: boolean) => void;
}

export default function Navigation({
  showSolutionButton = false,
  isSolution = false,
  isDialogOpen = false,
  isEvaluationDialogOpen = false,
  onToggleSolution,
  onEvaluationDialogOpenChange,
  onDialogOpenChange,
}: NavigationProps) {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.config.theme);

  const toggleTheme = () => {
    dispatch(setTheme(currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <nav className="flex w-full items-center justify-between px-6 py-3 border-b-2 border-primary-foreground fixed top-0 bg-background z-10">
      <div className="flex flex-row items-center gap-4">
        <Link className="text-2xl font-extrabold logo" to="/">
          SDS
        </Link>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <Link
          to="https://github.com/lastbyte/sds"
          target="_blank"
          rel="noreferrer"
        >
          <SiGithub size={32} className="cursor-pointer" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"secondary"} className="cursor-pointer">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span>Theme</span>
              </div>
              <div className="flex items-center space-x-2">
                <SunIcon className="text-yellow-500" />
                <Switch
                  checked={currentTheme === "dark"}
                  onCheckedChange={toggleTheme}
                />
                <MoonStarIcon className="text-gray-500" />
              </div>
            </DropdownMenuItem>

            {showSolutionButton && (
              <>
                <DropdownMenuSeparator />
                {isSolution ? (
                  <DropdownMenuItem onClick={() => onToggleSolution?.(false)}>
                    <EyeOffIcon className="w-4 h-4 mr-2" />
                    Hide Solution
                  </DropdownMenuItem>
                ) : (
                  <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <EyeIcon className="w-4 h-4 mr-2" />
                        View Solution
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          Viewing the solution may spoil the fun of solving the
                          problem on your own. Only proceed if you're okay with
                          that!
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => {
                            onToggleSolution?.(true);
                            onDialogOpenChange?.(false);
                          }}
                        >
                          View Solution
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => onDialogOpenChange?.(false)}
                        >
                          Cancel
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                <DropdownMenuItem
                  onClick={() => onEvaluationDialogOpenChange?.(true)}
                >
                  <ClipboardCheckIcon className="w-4 h-4 mr-2" />
                  Evaluate
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Evaluation Dialog - separate from dropdown */}
      <Dialog
        open={isEvaluationDialogOpen}
        onOpenChange={onEvaluationDialogOpenChange}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Follow the following steps to evaluate your solution.
            </DialogTitle>
            <ul className="list-decimal flex flex-col gap-4 p-2">
              <li>Export your design as an image.</li>
              <li>
                <PromptBox />
              </li>
              <li>
                Copy the prompt above and attach the image into any AI tool like
                ChatGPT, Bing Chat, or Claude.
              </li>
            </ul>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => onEvaluationDialogOpenChange?.(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
