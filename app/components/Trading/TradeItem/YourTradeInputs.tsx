"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMemo } from "react";

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

export const YourTradeInputs = ({
  currentSurvivor,
  yourItem,
  yourQuantity,
  setYourItem,
  setYourQuantity,
}: {
  currentSurvivor: Survivor;
  yourItem: number | string;
  yourQuantity: string | number;
  setYourItem: (value: number) => void;
  setYourQuantity: (value: string) => void;
}) => {
  const maxItemQuantity = useMemo(() => {
    if (yourItem) {
      const item = currentSurvivor.items.find(
        (item: NewItem) => item.id === yourItem
      );
      if (item) {
        return item.quantity;
      }
    }
    return 0;
  }, [yourItem, currentSurvivor]);

  return (
    <div className="flex gap-2">
      <div className="w-1/2">
        <FormControl fullWidth>
          <InputLabel id="your_item">Your inventory</InputLabel>
          <Select
            value={`${yourItem}`}
            name="your_item"
            onChange={(e) => setYourItem(+e.target.value)}
            labelId="gender"
            defaultValue="Male"
            label="Your inventory"
            size="small"
          >
            {currentSurvivor.items.map((item: NewItem) => (
              <MenuItem key={item.name} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-1/2">
        <TextField
          name="quantity"
          value={yourQuantity}
          onChange={(e) => setYourQuantity(e.target.value)}
          size="small"
          label="Quantity"
          placeholder={`Item's quantity (max ${maxItemQuantity})`}
          type="number"
          fullWidth
          slotProps={{
            htmlInput: { min: 0, max: maxItemQuantity },
          }}
          error={+yourQuantity > maxItemQuantity}
          helperText={
            +yourQuantity > maxItemQuantity
              ? `Exceeds the maximum quantity`
              : ""
          }
        />
      </div>
    </div>
  );
};
