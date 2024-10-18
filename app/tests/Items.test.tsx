import { render, act, screen } from "@testing-library/react";
import {
  SurvivalProvider,
  useSurvivalContext,
} from "../context/survivalContext";

import { mockData } from "./__mockData__/mockData";
import { Inventory } from "../components/Inventory/Inventory";

jest.mock("../context/survivalContext", () => {
  const originalModule = jest.requireActual("../context/survivalContext");

  return {
    ...originalModule,
    useSurvivalContext: jest.fn(),
  };
});

const setCurrentPageMock = jest.fn();

beforeEach(() => {
  mockData.currentPage = "Inventory";
});

test("renders Items page with mocked data", async () => {
  (useSurvivalContext as jest.Mock).mockReturnValue({
    ...mockData,
    setCurrentPage: setCurrentPageMock,
  });

  await act(async () => {
    render(
      <SurvivalProvider>
        <Inventory />
      </SurvivalProvider>
    );
  });

  expect(mockData.currentPage).toBe("Inventory");
  expect(await screen.findByText("List of items")).toBeInTheDocument();

  const medicineKits = await screen.findAllByText("Medicine Kit");
  const proteinJuice = await screen.findAllByText("Protein Juice");
  expect(medicineKits.length).toBeGreaterThan(0);
  expect(proteinJuice.length).toBeGreaterThan(0);
});
