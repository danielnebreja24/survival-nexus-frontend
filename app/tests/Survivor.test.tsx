import { render, act, screen } from "@testing-library/react";
import {
  SurvivalProvider,
  useSurvivalContext,
} from "../context/survivalContext";
import { Survivors } from "../components/Survivors/Survivor";
import { mockData } from "./__mockData__/mockData";

jest.mock("../context/survivalContext", () => {
  const originalModule = jest.requireActual("../context/survivalContext");

  return {
    ...originalModule,
    useSurvivalContext: jest.fn(),
  };
});

const setCurrentPageMock = jest.fn();

beforeEach(() => {
  mockData.currentPage = "Survivors";
});

test("renders Survivors page with mocked data and checks currentPage", async () => {
  (useSurvivalContext as jest.Mock).mockReturnValue({
    ...mockData,
    setCurrentPage: setCurrentPageMock,
  });

  await act(async () => {
    render(
      <SurvivalProvider>
        <Survivors />
      </SurvivalProvider>
    );
  });

  expect(mockData.currentPage).toBe("Survivors");
  expect(await screen.findByText("Gean Lyka Dasal")).toBeInTheDocument();
  expect(await screen.findByText("Lyka Dagul")).toBeInTheDocument();
});
