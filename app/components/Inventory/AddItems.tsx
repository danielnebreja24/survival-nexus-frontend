import { useSurvivalContext } from "@/app/context/survivalContext";
import { AddCircleOutline, AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Item {
  name: string;
  description: string;
}

export const AddItems = () => {
  const { createItems } = useSurvivalContext();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (name && description) {
      setDisabled(false);
    }
  }, [name, description]);

  const handleSave = async () => {
    const form: Item = {
      name,
      description,
    };

    const response = await createItems(form);

    if (!response?.error) {
      toast.success("Survivor saved successfully");
      setOpen(false);

      setName("");
      setDescription("");
    } else {
      toast.error(response.error || "An error occurred");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        <AddCircleOutline className="mr-2" /> Add Item
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="flex items-center">
          <AddShoppingCartOutlined /> &nbsp; Add new item to inventory
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <TextField
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              size="small"
              label="Name"
              placeholder="Enter item's name"
            />

            <TextField
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              size="small"
              multiline
              rows={4}
              maxRows={4}
              label="Description"
              placeholder="Enter item's description"
            />
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
