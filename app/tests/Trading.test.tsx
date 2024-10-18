import { render, act, screen } from "@testing-library/react";
import {
  SurvivalProvider,
  useSurvivalContext,
} from "../context/survivalContext";
import { mockData } from "./__mockData__/mockData";
import { Trading } from "../components/Trading/Trading";

jest.mock("../context/survivalContext", () => {
  const originalModule = jest.requireActual("../context/survivalContext");

  return {
    ...originalModule,
    useSurvivalContext: jest.fn(),
  };
});

const setCurrentPageMock = jest.fn();

beforeEach(() => {
  mockData.currentPage = "Trading";
});

test("renders Trading page with mocked data", async () => {
  (useSurvivalContext as jest.Mock).mockReturnValue({
    ...mockData,
    setCurrentPage: setCurrentPageMock,
  });

  await act(async () => {
    render(
      <SurvivalProvider>
        <Trading />
      </SurvivalProvider>
    );
  });

  expect(mockData.currentPage).toBe("Trading");
  expect(
    await screen.findByText("Trade items between survivors")
  ).toBeInTheDocument();

  expect(await screen.findByText("Gean Lyka Dasal")).toBeInTheDocument();
  expect(await screen.findByText("Lyka Dagul")).toBeInTheDocument();
});
