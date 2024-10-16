import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSurvivalContext } from "@/app/context/survivalContext";
import { Button, Chip } from "@mui/material";
import {
  AddCircleOutline,
  CoronavirusOutlined,
  HealthAndSafetyOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { TradeItem } from "./TradeItem";
import { useEffect, useState } from "react";
// import { AddItemToSurvivor } from "./AddItemToSurvivor";

interface ItemsResponse {
  id: number;
  name: string;
}

interface NewItem {
  id: number;
  quantity: number;
  name: string;
}

interface Inventory {
  id: number;
  itemId: number;
  quantity: number;
  survivorId: number;
  item: ItemsResponse;
}

interface Survivor {
  id: number;
  name: string;

  items: NewItem[];
}

export const TradingTable = () => {
  const { survivorList } = useSurvivalContext();
  const [survivorWithItems, setSurvivorWithItems] = useState<Survivor[] | []>(
    []
  );

  useEffect(() => {
    if (survivorList.length > 0) {
      const survivorWithItems: Survivor[] = survivorList
        .filter((survivor) => survivor.inventory.length) // Filter out survivors without items
        .map((survivor) => ({
          id: survivor.id,
          name: survivor.name,
          items: survivor.inventory.map((item: Inventory) => ({
            id: item.id,
            quantity: item.quantity,
            name: item.item.name,
          })),
        }));

      setSurvivorWithItems(survivorWithItems);
    }
  }, [survivorList]);

  const columns: GridColDef[] = [
    { field: "name", renderHeader: () => <b>Name</b>, width: 200, flex: 1 },
    {
      field: "items",
      renderHeader: () => <b>Inventories</b>,
      renderCell: ({ row }: { row: Survivor }) => {
        console.log(row);
        return (
          <div className="flex gap-2">
            {row.items.map((item, i) => (
              <span>
                {item.quantity} {item.name} {i !== row.items.length - 1 && ","}
              </span>
            ))}
          </div>
        );
      },
      width: 200,
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }: { row: Survivor }) => {
        return (
          <span>
            <TradeItem />
          </span>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box className="shadow-lg rounded-lg mt-5 ">
      <DataGrid
        disableRowSelectionOnClick
        disableColumnSelector
        rows={survivorWithItems}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiButtonBase-root:focus": {
            outline: "none",
          },
        }}
      />
    </Box>
  );
};
