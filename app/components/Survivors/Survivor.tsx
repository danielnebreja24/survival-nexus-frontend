import { Box } from "@mui/material";
import { AddSurvivor } from "./AddSurvivor";
import { SurvivorTable } from "./SurvivorTable";
import { useSurvivalContext } from "@/app/context/survivalContext";
import { useMemo } from "react";

export const Survivors = () => {
  const { survivorList } = useSurvivalContext();

  const healthy = useMemo(() => {
    return survivorList.filter((survivor) => !survivor.infected).length;
  }, [survivorList]);

  const infected = useMemo(() => {
    return survivorList.length - healthy;
  }, [survivorList]);

  return (
    <Box component="section" className="box-border px-2">
      <h4 className="text-2xl font-bold mt-2">List of survivors</h4>
      <div className="flex justify-between items-center">
        <span className="text-sm">
          You have a total of <b>{survivorList.length}</b> survivors ({healthy}{" "}
          healthy, {infected} infected)
        </span>
        <AddSurvivor />
      </div>
      <SurvivorTable />
    </Box>
  );
};
