import { useSurvivalContext } from "@/app/context/survivalContext";
import { Button, Chip } from "@mui/material";

export const UserStatusReport = ({ status }: { status: string }) => {
  const { survivorList, setCurrentPage } = useSurvivalContext();

  const infectedUsers = survivorList.filter((survivor) =>
    status === "Healthy" ? !survivor.infected : survivor.infected
  );

  return (
    <div className="max-w-xl w-1/4 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mt-5">
      <div className="p-4">
        <div className="text-3xl font-bold text-gray-800 w-full flex items-center justify-between">
          {infectedUsers.length}
          <Chip
            label={`${(infectedUsers.length / survivorList.length) * 100}%`}
            className="ml-2"
            color={status === "Healthy" ? "success" : "error"}
            variant="outlined"
            size="small"
          />
        </div>
        <p className="text-gray-600 font-bold text-sm mt-2">
          {status} Survivors
        </p>
        <p className="mt-1 text-gray-500 text-sm">
          The total number of {status} survivors.
        </p>
      </div>
      <div className="bg-gray-100 p-3 flex justify-between items-center">
        <span className="text-gray-500 text-xs">
          Out of {survivorList.length} survivors
        </span>
        <Button
          onClick={() => setCurrentPage("Survivors")}
          variant="contained"
          size="small"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
