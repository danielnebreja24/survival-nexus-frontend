import { Box } from "@mui/material";
import { AddItems } from "./AddItems";
import { ItemsTable } from "./InventoryTable";
import { useSurvivalContext } from "@/app/context/survivalContext";

export const Inventory = () => {
  const { itemsList } = useSurvivalContext();

  return (
    <Box component="section" className="box-border px-2">
      <h4 className="text-2xl font-bold mt-2">List of items</h4>{" "}
      <div className="flex justify-between items-center">
        <span className="text-sm">
          You have a total of <b>{itemsList.length}</b> items
        </span>
        <AddItems />
      </div>
      <ItemsTable />
    </Box>
  );
};
