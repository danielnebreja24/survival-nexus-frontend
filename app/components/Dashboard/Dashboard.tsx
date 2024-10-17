import { useSurvivalContext } from "@/app/context/survivalContext";
import { UserStatusReport } from "./userStatusReport";
import { LineChart } from "@mui/x-charts";

export const Dashboard = () => {
  const { survivorList, itemsList } = useSurvivalContext();

  return (
    <div className="box-border p-3">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="mt-5 w-full flex px-5 justify-around">
        <UserStatusReport
          type="Survivors"
          status="Healthy"
          data={survivorList}
        />
        <UserStatusReport
          type="Survivors"
          status="Infected"
          data={survivorList}
        />
        <UserStatusReport type="Items" status="" data={itemsList} />
      </div>

      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            area: true,
          },
        ]}
        // width={500}
        height={400}
        colors={["#1976d2"]}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
};
