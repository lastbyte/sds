import { Link } from "react-router-dom";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between px-6 py-3 border-b-2 border-gray-300 sticky">
      <div className="flex flex-row items-center gap-4">
        <Link className="text-2xl font-extrabold logo" to="/">
          SDS
        </Link>
      </div>
      <div className="flex flex-row gap-1">
        <SiGithub size={20} className="cursor-pointer" />
      </div>
    </nav>
  );
}
