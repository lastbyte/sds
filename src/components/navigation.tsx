import { Link } from "react-router-dom";
import { SiGithub } from "@icons-pack/react-simple-icons";
import ThemeSwitch from "./theme-switch";

export default function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between px-6 py-3 border-b-2 border-primary-foreground fixed top-0 bg-background z-[999]">
      <div className="flex flex-row items-center gap-4">
        <Link className="text-2xl font-extrabold logo" to="/">
          SDS
        </Link>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <ThemeSwitch />
        <Link
          to="https://github.com/lastbyte/sds"
          target="_blank"
          rel="noreferrer"
        >
          <SiGithub size={20} className="cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
}
