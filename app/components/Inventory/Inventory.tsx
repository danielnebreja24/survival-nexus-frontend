import { Box } from "@mui/material";
import { AddItems } from "./AddItems";
import { ItemsTable } from "./InventoryTable";
import { useSurvivalContext } from "@/app/context/survivalContext";
import { useEffect } from "react";

export const Inventory = () => {
  const { fetchItems } = useSurvivalContext();

  return (
    <Box component="section" className="box-border p-2">
      <div className="flex justify-between items-center">
        <h4 className="text-1xl font-bold">List of items in inventory</h4>{" "}
        <AddItems />
      </div>
      <ItemsTable />
    </Box>
  );
};
