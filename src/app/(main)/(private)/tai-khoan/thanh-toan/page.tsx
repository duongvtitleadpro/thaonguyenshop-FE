import DataTable from "@/components/table/data-table";
import { promises as fs } from "fs";
import path from "path";
import { Data } from "./schema";
import { columns } from "./columns";
async function getData() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      "src/app/(main)/(private)/tai-khoan/thanh-toan/data.json"
    )
  );

  const rechargeData: Data[] = JSON.parse(data.toString()).data;

  return rechargeData;
}
const PaymentPage = async () => {
  const data = await getData();

  return <DataTable data={data} columns={columns} />;
};

export default PaymentPage;
