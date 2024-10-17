import { useSurvivalContext } from "@/app/context/survivalContext";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

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

export const ReceiverTradeInputs = ({
  currentSurvivor,
  receiver,
  receiverItem,
  receiverQuantity,
  setReceiver,
  setReceiverItem,
  setReceiverQuantity,
}: {
  currentSurvivor: number;
  receiver: number;
  receiverItem: number | string;
  receiverQuantity: string | number;
  setReceiver: (value: number) => void;
  setReceiverItem: (value: number | number) => void;
  setReceiverQuantity: (value: string | number) => void;
}) => {
  const { survivorWithItems } = useSurvivalContext();
  const [currentReceiverItems, setCurrentReceiverItems] = useState<NewItem[]>(
    []
  );

  const maxItemQuantity = useMemo(() => {
    if (receiverItem) {
      const item = currentReceiverItems.find(
        (item: NewItem) => item.id === receiverItem
      );
      if (item) {
        return item.quantity;
      }
    }
    return 0;
  }, [receiverItem]);

  useEffect(() => {
    const currentReceiver = survivorWithItems.find(
      (item: Survivor) => item.id === receiver
    );
    if (currentReceiver) {
      setCurrentReceiverItems(currentReceiver.items);
      setReceiverItem(currentReceiver.items[0].id);
    }
  }, [receiver]);

  console.log(survivorWithItems, currentReceiverItems);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="your_item">Select Receiver</InputLabel>
        <Select
          value={`${receiver}`}
          name="your_item"
          onChange={(e) => setReceiver(+e.target.value)}
          labelId="gender"
          defaultValue="Male"
          label="Select Receiver"
          size="small"
        >
          {survivorWithItems
            .filter((item: Survivor) => item.id !== currentSurvivor)
            .map((item: Survivor) => (
              <MenuItem key={item.name} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <div className="flex gap-2 mt-5">
        <div className="w-1/2">
          <FormControl fullWidth>
            <InputLabel id="receiver_item">Inventory</InputLabel>
            <Select
              value={receiverItem}
              name="receiverItem"
              onChange={(e) => setReceiverItem(+e.target.value)}
              labelId="receiver_item"
              label="Inventory"
              size="small"
            >
              {currentReceiverItems.map((item: NewItem) => (
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
            value={receiverQuantity}
            onChange={(e) => setReceiverQuantity(e.target.value)}
            size="small"
            label="Quantity"
            slotProps={{
              htmlInput: { min: 0, max: maxItemQuantity },
            }}
            placeholder={`Item's quantity (max ${maxItemQuantity})`}
            type="number"
            error={+receiverQuantity > maxItemQuantity}
            helperText={
              +receiverQuantity > maxItemQuantity
                ? "Exceeds the maximum quantity"
                : ""
            }
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};
