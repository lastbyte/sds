import { Switch } from "@/components/ui/switch";
import { useAppDispatch, type RootState } from "@/store";
import { setTheme } from "@/store/slices/config";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  MoonStarIcon,
  SunIcon
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navigation() {
  const dispatch = useAppDispatch();
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
      <div className="flex flex-row gap-6 items-center">
        <div className="flex items-center gap-1 flex-row">
          <SunIcon className="h-6 w-6 text-yellow-500" />
          <Switch
            id="theme-toggle"
            checked={currentTheme === "dark"}
            onCheckedChange={toggleTheme}
          />
          <MoonStarIcon className="h-6 w-6 text-gray-500" />
        </div>
        <Link
          to="https://github.com/lastbyte/sds"
          target="_blank"
          rel="noreferrer"
        >
          <SiGithub size={32} className="cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
}
