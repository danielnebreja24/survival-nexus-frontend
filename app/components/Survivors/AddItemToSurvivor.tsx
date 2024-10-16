import { useSurvivalContext } from "@/app/context/survivalContext";
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
import { useState } from "react";
import { toast } from "react-toastify";

export const AddItemToSurvivor = ({ survivorId }: { survivorId: number }) => {
  const { itemsList, addItemsToSurvivor } = useSurvivalContext();
  const [open, setOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number | string>("");
  const [item, setItem] = useState<number | string>(itemsList[0]?.id);

  const handleSave = async () => {
    if (+quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    const response = await addItemsToSurvivor(survivorId, +item, +quantity);

    if (!response?.error) {
      toast.success("Item added successfully");
      setOpen(false);
      setQuantity("");
      setItem(itemsList[0]?.id);
    } else {
      toast.error(response.error || "An error occurred");
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="small"
        variant="contained"
        color="primary"
      >
        Add Item
      </Button>

      <Dialog
        maxWidth="xs"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
      >
        <DialogTitle>Select an item to add</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <FormControl fullWidth>
              <InputLabel id="items">Items</InputLabel>
              <Select
                value={item}
                onChange={(e) => setItem(e.target.value)}
                labelId="items"
                defaultValue="Uninfected"
                label="Items"
                size="small"
                name="quantity"
              >
                {itemsList.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              value={quantity}
              name="quantity"
              onChange={(e) => setQuantity(+e.target.value)}
              size="small"
              type="number"
              label="Quantity"
              placeholder="Enter item's quantity"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSave();
            }}
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
