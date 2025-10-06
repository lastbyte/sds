import { DataTable } from "@/components/data-table";
import data from "@/assets/meta.json";

export default function Discover() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-3">
      <div className="w-full flex flex-col items-start mb-6">
        <h1 className="text-4xl font-extrabold mb-2 font-saira">
          {data.title}
        </h1>
        <p>{data.description}</p>
      </div>
      <DataTable />
    </div>
  );
}
