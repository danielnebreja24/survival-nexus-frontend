import { render, act, screen } from "@testing-library/react";
import {
  SurvivalProvider,
  useSurvivalContext,
} from "../context/survivalContext";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { mockData } from "./__mockData__/mockData";

jest.mock("../context/survivalContext", () => {
  const originalModule = jest.requireActual("../context/survivalContext");

  return {
    ...originalModule,
    useSurvivalContext: jest.fn(),
  };
});

const setCurrentPageMock = jest.fn((page) => {
  mockData.currentPage = page;
});

beforeAll(() => {
  setCurrentPageMock("Dashboard");
});

test("renders dashboard with mocked data", async () => {
  (useSurvivalContext as jest.Mock).mockReturnValue({
    ...mockData,
    setCurrentPage: setCurrentPageMock,
  });

  await act(async () => {
    render(
      <SurvivalProvider>
        <Dashboard />
      </SurvivalProvider>
    );
  });

  expect(mockData.currentPage).toBe("Dashboard");

  expect(await screen.findByText("Reports")).toBeInTheDocument();
  expect(await screen.findByText("100%")).toBeInTheDocument();
  expect(await screen.findByText("Healthy Survivors")).toBeInTheDocument();
});
