import { useSurvivalContext } from "@/app/context/survivalContext";
import { UserStatusReport } from "./userStatusReport";
import { AverageItemsChart } from "./AverageItemsChart";

export const Dashboard = () => {
  const { survivorList, itemsList } = useSurvivalContext();

  return (
    <div className="box-border px-3">
      <h1 className="text-2xl font-bold">Reports</h1>
      <div className="mt-5 w-full flex flex-wrap lg:flex-row px-5 lg:justify-around">
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
      <AverageItemsChart />
    </div>
  );
};
