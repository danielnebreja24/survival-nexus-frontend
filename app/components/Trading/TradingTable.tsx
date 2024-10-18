import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSurvivalContext } from "@/app/context/survivalContext";
import { Box } from "@mui/material";
import { TradeItem } from "./TradeItem/TradeItem";

interface NewItem {
  id: number;
  quantity: number;
  name: string;
}

interface Survivor {
  id: number;
  name: string;
  items: NewItem[];
}

export const TradingTable = () => {
  const { survivorWithItems } = useSurvivalContext();

  const columns: GridColDef[] = [
    { field: "name", renderHeader: () => <b>Name</b>, width: 300 },
    {
      field: "items",
      renderHeader: () => <b>Inventories</b>,
      renderCell: ({ row }: { row: Survivor }) => {
        return (
          <div className="flex gap-2 overflow-hidden whitespace-nowrap w-full">
            <div className="overflow-hidden text-ellipsis max-w-full">
              {row.items.map((item, i) => (
                <span key={item.name}>
                  {item.quantity} {item.name}
                  {i !== row.items.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        );
      },
      width: 200,
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      renderHeader: () => <b>Actions</b>,
      width: 150,
      renderCell: ({ row }: { row: Survivor }) => {
        return (
          <span>
            <TradeItem currentSurvivor={row} />
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
          "& .MuiDataGrid-virtualScroller": {
            maxHeight: "550px",
          },
        }}
      />
    </Box>
  );
};
