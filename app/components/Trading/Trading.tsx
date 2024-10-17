import { Box } from "@mui/material";
import { TradingTable } from "./TradingTable";
import { useSurvivalContext } from "@/app/context/survivalContext";

export const Trading = () => {
  const { survivorWithItems } = useSurvivalContext();
  return (
    <Box component="section" className="box-border px-2">
      {/* <div className="flex justify-between items-center mt-2">
        <h4 className="text-2xl font-bold"></h4>
      </div> */}
      <h4 className="text-2xl font-bold mt-2">Trade items between survivors</h4>
      <div className="flex justify-between items-center">
        <span className="text-sm mt-2">
          You have a total of <b>{survivorWithItems.length}</b> survivors with
          items on their inventory
        </span>
      </div>
      <TradingTable />
    </Box>
  );
};
