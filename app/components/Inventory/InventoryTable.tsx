import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSurvivalContext } from "@/app/context/survivalContext";
import { Box } from "@mui/material";

export const ItemsTable = () => {
  const { itemsList } = useSurvivalContext();

  const columns: GridColDef[] = [
    {
      field: "name",
      renderHeader: () => <b>Name</b>,
      width: 200,
      flex: 1,
    },
    {
      field: "description",
      renderHeader: () => <b>Description</b>,
      width: 350,
      flex: 1,
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box className="shadow-lg rounded-lg mt-5 ">
      <DataGrid
        rows={itemsList}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
};
