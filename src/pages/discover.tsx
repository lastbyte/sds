import { DataTable } from "@/components/dataTable";
import data from "@/assets/meta.json";

export default function Discover() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-3">
      <div className="w-full md:h-2 lg:h-8">
        <p>{data.description}</p>
      </div>
      <DataTable />
    </div>
  );
}
