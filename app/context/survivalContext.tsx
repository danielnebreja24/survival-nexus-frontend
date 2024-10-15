"use client";
import { PaletteMode } from "@mui/material";
import axios from "axios";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface SurvivalContextProps {
  mode: PaletteMode;
  openDrawer: boolean;
  currentPage: string;
  survivorList: SurvivorResponse[];
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
}

export const SurvivalProvider: React.FC<SurvivalProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<"dark" | "light">("light");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [survivorList, setSurvivorList] = useState<SurvivorResponse[]>([]);

  useEffect(() => {
    fetchSurvivors();
  }, []);

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

  return (
    <SurvivalContext.Provider
      value={{
        mode,
        openDrawer,
        currentPage,
        survivorList,
        createSurvivor,
        setCurrentPage,
        setOpenDrawer,
        setMode,
      }}
    >
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
