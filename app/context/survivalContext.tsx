"use client";
import { PaletteMode } from "@mui/material";
import { createContext, useState, ReactNode, useContext } from "react";

interface SurvivalContextProps {
  mode: PaletteMode;
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  setMode: (mode: "dark" | "light") => void;
}

const SurvivalContext = createContext<SurvivalContextProps | undefined>(
  undefined
);

interface SurvivalProviderProps {
  children: ReactNode;
}

// CONTEXT USED IN ALL THE COMPONENTS TO AVOID PROPS DRILLING

export const SurvivalProvider: React.FC<SurvivalProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<"dark" | "light">("light");
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <SurvivalContext.Provider
      value={{
        mode,
        openDrawer,
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
