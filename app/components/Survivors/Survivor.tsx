import { Box, Button } from "@mui/material";
import { AddSurvivor } from "./AddSurvivor";
import { SurvivorTable } from "./SurvivorTable";

export const Survivors = () => {
  return (
    <Box component="section" className="p-2">
      <div className="flex justify-end">
        <AddSurvivor />
      </div>
      <SurvivorTable />
    </Box>
  );
};
