import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSelector((state: RootState) => state.config.theme);

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Optional: Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <>{children}</>;
}
