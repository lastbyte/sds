import { DataTable } from "@/components/data-table";
import data from "@/assets/meta.json";

export default function Discover() {
  return (
    <div className="flex flex-col items-center justify-center px-3 sm:px-6 py-3 box-border max-w-svw">
      <div className="flex flex-col items-start mb-4 sm:mb-6 w-full max-w-7xl">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 font-saira">
          {data.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {data.description}
        </p>
      </div>
      <DataTable />
    </div>
  );
}
