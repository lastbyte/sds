import { DataTable } from "@/components/data-table";
import data from "@/assets/meta.json";
import OpenTopicDialog from "@/components/open-topic-dialog";

export default function Discover() {
  return (
    <div className="flex flex-col items-center justify-center px-3 sm:px-6 py-3 box-border max-w-svw">
      <div className="flex flex-col items-start mb-4 sm:mb-6 w-full">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 font-saira">
          {data.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {data.description}
        </p>
      </div>
      <OpenTopicDialog />
      <DataTable />
    </div>
  );
}
