"use client";

import { PaletteMode } from "@mui/material";
import axios from "axios";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useMemo,
  useEffect,
} from "react";

interface SurvivalContextProps {
  mode: PaletteMode;
  openDrawer: boolean;
  currentPage: string;
  survivorList: SurvivorResponse[];
  itemsList: ItemsResponse[];
  survivorWithItems: ItemsSurvivor[];
  addItemsToSurvivor: (
    survivorId: number,
    itemId: number,
    quantity: number
  ) => Promise<any>;
  tradeItems: (
    traderID: number,
    receiverID: number,
    traderItemID: number,
    receiverItemID: number,
    traderItemQty: number,
    receiverItemQty: number
  ) => Promise<any>;
  fetchAverageItemPerSurvivor: () => Promise<any>;
  createItems: (form: Items) => Promise<any>;
  fetchItems: () => Promise<void>;
  fetchSurvivors: () => Promise<void>;
  createSurvivor: (form: Survivor) => Promise<any>;
  setCurrentPage: (page: string) => void;
  setOpenDrawer: (open: boolean) => void;
  setMode: (mode: "dark" | "light") => void;
}

const SurvivalContext = createContext<SurvivalContextProps | undefined>(
  undefined
);

interface SurvivalProviderProps {
  children: ReactNode;
}

interface Inventory {
  id: number;
  itemId: number;
  quantity: number;
  survivorId: number;
  item: ItemsResponse;
}

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

interface SurvivorResponse {
  id: number;
  name: string;
  age: number | string;
  gender: string;
  lastLocation: {
    longitude: number | string;
    latitude: number | string;
  };
  infected: boolean;
  inventory: Inventory[];
}

interface Items {
  name: string;
  description: string;
}

interface ItemsResponse {
  id: number;
  name: string;
  description: string;
}

interface NewItem {
  id: number;
  quantity: number;
  name: string;
}

interface ItemsSurvivor {
  id: number;
  name: string;
  items: NewItem[];
}

const baseUrl = "http://localhost:5000/api";
export const SurvivalProvider: React.FC<SurvivalProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<"dark" | "light">("light");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [survivorList, setSurvivorList] = useState<SurvivorResponse[]>([]);
  const [itemsList, setItemsList] = useState<ItemsResponse[]>([]);
  const [survivorWithItems, setSurvivorWithItems] = useState<ItemsSurvivor[]>(
    []
  );

  useEffect(() => {
    const updateSurvivorWithItems = () => {
      const updatedList = survivorList
        .filter((survivor) => survivor.inventory.length > 0)
        .map((survivor) => ({
          id: survivor.id,
          name: survivor.name,
          items: survivor.inventory.map(({ item, quantity }: Inventory) => ({
            id: item.id,
            quantity,
            name: item.name,
          })),
        }));
      setSurvivorWithItems(updatedList as ItemsSurvivor[]);
    };

    updateSurvivorWithItems();
  }, [survivorList]);

  useEffect(() => {
    fetchSurvivors();
    fetchItems();
  }, []);

  const apiCall = async (method: "GET" | "POST", url: string, data?: any) => {
    try {
      const response = await axios({
        method,
        url: `${process.env.NEXT_PUBLIC_API_URL || baseUrl}${url}`,
        data,
      });

      console.log(data);

      return response?.data || {};
    } catch (error: any) {
      console.error(error);
      return { error: error?.response?.data?.error || "An error occurred" };
    }
  };

  const createSurvivor = async (form: Survivor) => {
    const response = await apiCall("POST", "/survivors", form);
    if (response) fetchSurvivors();
    return response;
  };

  const fetchSurvivors = async () => {
    const response = await apiCall("GET", "/survivors");

    if (response) setSurvivorList(response);
  };

  const createItems = async (form: Items) => {
    const response = await apiCall("POST", "/items", form);
    if (response) fetchItems();
    return response;
  };

  const fetchItems = async () => {
    const response = await apiCall("GET", "/items");
    if (response) setItemsList(response);
  };

  const addItemsToSurvivor = async (
    survivorId: number,
    itemId: number,
    quantity: number
  ) => {
    const response = await apiCall("POST", "/survivorItem", {
      survivorId,
      itemId,
      quantity,
    });
    if (response) fetchSurvivors();
    return response;
  };

  const tradeItems = async (
    traderId: number,
    receiverId: number,
    traderItemId: number,
    receiverItemId: number,
    traderItemQty: number,
    receiverItemQty: number
  ) => {
    const response = await apiCall("POST", "/trade", {
      traderId,
      receiverId,
      traderItemId,
      receiverItemId,
      traderItemQty,
      receiverItemQty,
    });
    if (response) fetchSurvivors();
    return response;
  };

  const fetchAverageItemPerSurvivor = async () => {
    return await apiCall("GET", "/averageItemSurvivor");
  };

  const contextValue = useMemo(
    () => ({
      mode,
      openDrawer,
      currentPage,
      survivorList,
      itemsList,
      survivorWithItems,
      fetchAverageItemPerSurvivor,
      tradeItems,
      addItemsToSurvivor,
      fetchItems,
      createItems,
      fetchSurvivors,
      createSurvivor,
      setCurrentPage,
      setOpenDrawer,
      setMode,
    }),
    [mode, openDrawer, currentPage, survivorList, itemsList, survivorWithItems]
  );

  return (
    <SurvivalContext.Provider value={contextValue}>
      {children}
    </SurvivalContext.Provider>
  );
};

export const useSurvivalContext = () => {
  const context = useContext(SurvivalContext);
  if (!context) {
    throw new Error(
      "useSurvivalContext must be used within a SurvivalProvider"
    );
  }
  return context;
};
