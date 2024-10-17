import { useSurvivalContext } from "@/app/context/survivalContext";
import {
  AddCircleOutline,
  PersonAddAlt1Outlined,
  PersonAddAlt1TwoTone,
  PersonAddOutlined,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { YourTradeInputs } from "./YourTradeInputs";
import { ReceiverTradeInputs } from "./ReceiverTradeInputs";

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

export const TradeItem = ({
  currentSurvivor,
}: {
  currentSurvivor: Survivor;
}) => {
  const { survivorWithItems, tradeItems } = useSurvivalContext();
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [yourItem, setYourItem] = useState<string | number>(
    currentSurvivor.items[0].id
  );
  const [yourQuantity, setYourQuantity] = useState<string | number>("");
  const [receiver, setReceiver] = useState<number>(
    survivorWithItems.filter(
      (item: Survivor) => item.id !== currentSurvivor.id
    )[0].id
  );
  const [receiverItem, setReceiverItem] = useState<string | number>("");
  const [receiverQuantity, setReceiverQuantity] = useState<string | number>("");

  useEffect(() => {
    if (yourItem && yourQuantity && receiverItem && receiverQuantity) {
      setDisabled(false);
    }
  }, [yourItem, yourQuantity, receiverItem, receiverQuantity]);

  const handleTrade = async () => {
    const maximumTraderQty =
      currentSurvivor.items.find((item) => item.id === yourItem)?.quantity || 0;

    const maximumReceiverQty =
      survivorWithItems
        .find((item) => item.id === receiver)
        ?.items.find((item) => item.id === receiverItem)?.quantity || 0;

    if (+yourQuantity > maximumTraderQty) {
      toast.error("You don't have enough items to trade");
      return;
    }

    if (+receiverQuantity > maximumReceiverQty) {
      toast.error("Receiver doesn't have enough items to trade");
      return;
    }

    const response = await tradeItems(
      currentSurvivor.id,
      +receiver,
      +yourItem,
      +receiverItem,
      +yourQuantity,
      +receiverQuantity
    );

    if (!response.error) {
      toast.success("Trade successful");
      setOpen(false);
      setYourItem(currentSurvivor.items[0].id);
      setYourQuantity("");
      setReceiverItem("");
      setReceiverQuantity("");
      setReceiver(
        survivorWithItems.filter((item) => item.id !== currentSurvivor.id)[0].id
      );
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      <Button
        size="small"
        onClick={() => setOpen(true)}
        variant="contained"
        color="primary"
      >
        Trade Item
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="flex items-center">
          Trade items with other survivor
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <div className="text-sm text-gray-500">Your trade information:</div>
            <YourTradeInputs
              currentSurvivor={currentSurvivor}
              yourItem={yourItem}
              yourQuantity={yourQuantity}
              setYourItem={setYourItem}
              setYourQuantity={setYourQuantity}
            />
            <Divider />
            <div className="text-sm text-gray-500">
              Receiver's trade information:
            </div>
            <ReceiverTradeInputs
              currentSurvivor={currentSurvivor.id}
              receiver={receiver}
              receiverItem={receiverItem}
              receiverQuantity={receiverQuantity}
              setReceiver={setReceiver}
              setReceiverItem={setReceiverItem}
              setReceiverQuantity={setReceiverQuantity}
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
            onClick={handleTrade}
            disabled={disabled}
            variant="contained"
            color="primary"
          >
            Trade
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
