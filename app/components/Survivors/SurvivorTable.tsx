import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSurvivalContext } from "@/app/context/survivalContext";
import { Chip } from "@mui/material";
import Image from "next/image";

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Age</b>
            </TableCell>
            <TableCell>
              <b>Gender</b>
            </TableCell>
            <TableCell>
              <b>Last Location</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {survivorList.map((row: Survivor) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>
                <Chip
                  icon={
                    <Image
                      width="12"
                      height="12"
                      alt="Longitude"
                      src="/images/longitude.png"
                    />
                  }
                  size="small"
                  label={row.lastLocation.longitude}
                  variant="outlined"
                />{" "}
                <Chip
                  icon={
                    <Image
                      width="12"
                      height="12"
                      alt="Longitude"
                      src="/images/latitude.png"
                    />
                  }
                  size="small"
                  label={row.lastLocation.latitude}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                {row.infected ? (
                  <Chip label="Infected" color="error" size="small" />
                ) : (
                  <Chip label="Uninfected" color="success" size="small" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
