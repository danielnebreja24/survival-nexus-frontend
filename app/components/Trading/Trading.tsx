import { Box } from "@mui/material";
// import { AddSurvivor } from "./AddSurvivor";
// import { SurvivorTable } from "./SurvivorTable";
import { useSurvivalContext } from "@/app/context/survivalContext";
import { TradingTable } from "./TradingTable";

export const Trading = () => {
  return (
    <Box component="section" className="box-border px-2">
      <div className="flex justify-between items-center">
        <h4 className="text-1xl font-bold">Trade items between survivors</h4>
        {/* <AddSurvivor /> */}
      </div>
      <TradingTable />
    </Box>
  );
};
