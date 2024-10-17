import * as React from "react";
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
import { AddItemToSurvivor } from "./AddItemToSurvivor";

interface Survivor {
  id: number;
  name: string;
  age: number | string;
  gender: string;
  lastLocation: {
    longitude: number | string;
    latitude: number | string;
  };
  infected: boolean;
}

export const SurvivorTable = () => {
  const { survivorList } = useSurvivalContext();

  const columns: GridColDef[] = [
    { field: "name", renderHeader: () => <b>Name</b>, width: 200, flex: 1 },
    { field: "age", renderHeader: () => <b>Age</b>, width: 100 },
    { field: "gender", renderHeader: () => <b>Gender</b>, width: 150 },
    {
      field: "lastLocation",
      renderHeader: () => <b>Last Location (Long/Lat)</b>,
      width: 250,
      renderCell: (params) => (
        <>
          <Chip
            icon={<LocationOnOutlined />}
            size="small"
            label={params.value.longitude}
            variant="outlined"
          />{" "}
          <Chip
            icon={<LocationOnOutlined />}
            size="small"
            label={params.value.latitude}
            variant="outlined"
          />
        </>
      ),
    },
    {
      field: "infected",
      renderHeader: () => <b>Status</b>,
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <Chip
            icon={<CoronavirusOutlined />}
            label="Infected"
            color="error"
            size="small"
          />
        ) : (
          <Chip
            icon={<HealthAndSafetyOutlined />}
            label="Uninfected"
            color="success"
            size="small"
          />
        ),
    },

    {
      field: "actions",
      headerName: "Actions",
      renderHeader: () => <b>Actions</b>,
      width: 150,
      renderCell: ({ row }: { row: Survivor }) => {
        return (
          <span>
            <AddItemToSurvivor survivorId={row.id} />
          </span>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box className="shadow-lg rounded-lg mt-2 ">
      <DataGrid
        disableRowSelectionOnClick
        disableColumnSelector
        rows={survivorList}
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
            maxHeight: "550px", // Set max height here
          },
        }}
      />
    </Box>
  );
};
