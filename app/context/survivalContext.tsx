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
  addItemsToSurvivor: (
    survivalId: number,
    itemId: number,
    quantity: number
  ) => Promise<any>;
  // fetchSurvivorItems: () => Promise<any>;
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

export const SurvivalProvider: React.FC<SurvivalProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<"dark" | "light">("light");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [survivorList, setSurvivorList] = useState<SurvivorResponse[]>([]);
  const [itemsList, setItemsList] = useState<ItemsResponse[]>([]);

  useEffect(() => {
    fetchSurvivors();
    fetchItems();
  }, []);

  // SURVIVOR'S CRUD OPERATIONS
  const createSurvivor = async (form: Survivor) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/survivors`,
        form
      );

      if (response.status === 201) {
        fetchSurvivors();
        return response.data;
      }
    } catch (error: any) {
      console.error(error);
      return { error: error?.response?.data?.error || "An error occurred" };
    }
  };

  const fetchSurvivors = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/survivors`
      );
      console.log(response.data);

      if (response.status === 200) {
        setSurvivorList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ITEMS CRUD OPERATIONS
  const createItems = async (form: Items) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/items`,
        form
      );

      if (response.status === 201) {
        fetchItems();
        return response.data;
      }
    } catch (error: any) {
      console.error(error);
      return { error: error?.response?.data?.error || "An error occurred" };
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/items`
      );

      if (response.status === 200) {
        setItemsList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addItemsToSurvivor = async (
    survivorId: number,
    itemId: number,
    quantity: number
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/survivorItem`,
        { survivorId, itemId, quantity }
      );

      if (response.status === 201) {
        fetchSurvivors();
        return response.data;
      }
    } catch (error: any) {
      console.error(error);
      return { error: error?.response?.data?.error || "An error occurred" };
    }
  };

  // const fetchSurvivorItems = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/survivorItem`
  //     );
  //     console.log(response);
  //     if (response.status === 200) {
  //       return response.data;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const contextValue = useMemo(
    () => ({
      mode,
      openDrawer,
      currentPage,
      survivorList,
      itemsList,
      // fetchSurvivorItems,
      addItemsToSurvivor,
      fetchItems,
      createItems,
      fetchSurvivors,
      createSurvivor,
      setCurrentPage,
      setOpenDrawer,
      setMode,
    }),
    [
      mode,
      openDrawer,
      currentPage,
      survivorList,
      itemsList,
      fetchItems,
      createItems,
      fetchSurvivors,
      createSurvivor,
    ]
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
