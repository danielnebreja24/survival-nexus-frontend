import { UserStatusReport } from "./userStatusReport";

export const Dashboard = () => {
  return (
    <div className="box-border p-3">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="mt-5 w-full flex p-5 justify-around">
        <UserStatusReport status="Healthy" />
        <UserStatusReport status="Infected" />
        <UserStatusReport status="Infected" />
      </div>
    </div>
  );
};
