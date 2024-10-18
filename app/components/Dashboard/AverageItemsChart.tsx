import { useSurvivalContext } from "@/app/context/survivalContext";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

interface ChartData {
  resource: string;
  average: number;
}

export const AverageItemsChart = () => {
  const { fetchAverageItemPerSurvivor } = useSurvivalContext();
  const [averageItems, setAverageItems] = useState<ChartData[]>([]);

  useEffect(() => {
    fetchSurvivors();
  }, []);

  const fetchSurvivors = async () => {
    const response = await fetchAverageItemPerSurvivor();

    if (response && !response.error) {
      setAverageItems(response);
    } else {
      console.error(response.error);
    }
  };

  return (
    <>
      <h3 className="text-sm text-gray-700 pt-5">Average Items Per Survivor</h3>
      <LineChart
        xAxis={[
          {
            data: averageItems.map((_, index) => index),
            valueFormatter: (value) => averageItems[value]?.resource || "",
          },
        ]}
        series={[
          {
            data: averageItems.map((item) => item.average),
            area: true,
          },
        ]}
        height={400}
        colors={["#1976d2"]}
        grid={{ vertical: true, horizontal: true }}
      />
    </>
  );
};
