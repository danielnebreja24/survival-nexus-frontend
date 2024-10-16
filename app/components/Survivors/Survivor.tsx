import { Box } from "@mui/material";
import { AddSurvivor } from "./AddSurvivor";
import { SurvivorTable } from "./SurvivorTable";
import { useSurvivalContext } from "@/app/context/survivalContext";

export const Survivors = () => {
  return (
    <Box component="section" className="box-border px-2">
      <div className="flex justify-between items-center">
        <h4 className="text-1xl font-bold">List of survivors</h4>{" "}
        <AddSurvivor />
      </div>
      <SurvivorTable />
    </Box>
  );
};
