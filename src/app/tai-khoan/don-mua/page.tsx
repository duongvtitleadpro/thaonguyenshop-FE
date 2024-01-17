import { CalendarDateRangePicker } from "@/components/date-range-picker";
import DataTable from "@/components/table/data-table";
import { promises as fs } from "fs";
import path from "path";
import { Data } from "./schema";
import { columns } from "./columns";

async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/tai-khoan/don-mua/data.json")
  );

  const exportData: Data[] = JSON.parse(data.toString()).data;

  return exportData;
}

const PurchaseOrderPage = async () => {
  const data = await getData();
  return (
    <>
      <CalendarDateRangePicker />
      <DataTable data={data} columns={columns} />
    </>
  );
};

export default PurchaseOrderPage;
