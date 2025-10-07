import { Toaster as Sonner } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const Toaster = ({ ...props }) => {
  const theme = useSelector((state: RootState) => state.config.theme);

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
