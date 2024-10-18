import { useSurvivalContext } from "@/app/context/survivalContext";
import { AddCircleOutline, PersonAddAlt1TwoTone } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Survivor {
  name: string;
  age: number | string;
  gender: string;
  lastLocation: {
    longitude: number | string;
    latitude: number | string;
  };
  infected: boolean;
}

export const AddSurvivor = () => {
  const { createSurvivor } = useSurvivalContext();
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string | number>("");
  const [gender, setGender] = useState<string>("Male");
  const [longitude, setLongitude] = useState<string | number>("");
  const [latitude, setLatitude] = useState<string | number>("");
  const [status, setStatus] = useState<string>("Uninfected");

  useEffect(() => {
    if (name && age && longitude && latitude) {
      setDisabled(false);
    }
  }, [name, age, longitude, latitude]);

  const handleSave = async () => {
    const form: Survivor = {
      name,
      age: +age,
      gender,
      lastLocation: { longitude: +longitude, latitude: +latitude },
      infected: status === "Infected" ? true : false,
    };

    const response = await createSurvivor(form);

    if (!response?.error) {
      toast.success("Survivor saved successfully");
      setOpen(false);

      setName("");
      setAge("");
      setGender("Male");
      setLongitude("");
      setLatitude("");
      setStatus("Uninfected");
    } else {
      toast.error(response.error || "An error occurred");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        <AddCircleOutline className="mr-2" /> Add Survivor
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="flex items-center">
          <PersonAddAlt1TwoTone /> &nbsp; Add new survivor
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <TextField
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              size="small"
              label="Name"
              placeholder="Enter survivor's name"
            />

            <div className="flex gap-2">
              <div className="w-1/2">
                <TextField
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  size="small"
                  label="Age"
                  placeholder="Enter survivor's age"
                  type="number"
                  fullWidth
                />
              </div>
              <div className="w-1/2">
                <FormControl fullWidth>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    value={gender}
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    labelId="gender"
                    defaultValue="Male"
                    label="Gender"
                    size="small"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <TextField
                  size="small"
                  label="Last Location (Longitude)"
                  name="longitude"
                  placeholder="Enter between -180 and 180"
                  type="number"
                  onChange={(e) => setLongitude(e.target.value)}
                  value={longitude}
                  slotProps={{
                    htmlInput: { min: -180, max: 180, step: "any" },
                  }}
                  fullWidth
                />
              </div>
              <div className="w-1/2">
                <TextField
                  size="small"
                  label="Last Location (Latitude)"
                  placeholder="Enter between -90 and 90"
                  type="number"
                  name="latitude"
                  onChange={(e) => setLatitude(e.target.value)}
                  value={latitude}
                  slotProps={{
                    htmlInput: { min: -90, max: 90, step: "any" },
                  }}
                  fullWidth
                />
              </div>
            </div>

            <FormControl fullWidth>
              <InputLabel id="infected">Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                labelId="infected"
                defaultValue="Uninfected"
                label="Status"
                size="small"
                name="status"
              >
                <MenuItem value="Infected">Infected</MenuItem>
                <MenuItem value="Uninfected">Uninfected</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button
            onClick={handleSave}
            disabled={disabled}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
