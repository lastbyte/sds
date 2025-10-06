import { MoonIcon, SunIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/store/slices/config";
import type { RootState } from "@/store";

export default function ThemeSwitch() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.config.theme);

  const toggleTheme = () => {
    dispatch(setTheme(currentTheme === "light" ? "dark" : "light"));
  };
  return (
    <div className="flex items-center space-x-2">
      <SunIcon className="text-yellow-500" size={16} />
      <Switch checked={currentTheme === "dark"} onCheckedChange={toggleTheme} />
      <MoonIcon className="text-gray-500" size={16} />
    </div>
  );
}
