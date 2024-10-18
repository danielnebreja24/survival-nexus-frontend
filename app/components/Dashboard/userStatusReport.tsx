import { useSurvivalContext } from "@/app/context/survivalContext";
import { Button, Chip } from "@mui/material";

export const UserStatusReport = ({
  status,
  type,
  data,
}: {
  status: string;
  type: string;
  data: any;
}) => {
  const { mode, setCurrentPage } = useSurvivalContext();
  const infectedUsers =
    type === "Survivors" &&
    data.filter((survivor: any) =>
      status === "Healthy" ? !survivor.infected : survivor.infected
    );

  return (
    <div
      className={`max-w-xl w-64 xl:w-80 mr-2 border flex flex-col rounded-lg shadow-lg overflow-hidden mb-5 
      ${
        mode === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="p-4 flex-grow">
        <div
          className={`text-3xl font-bold w-full flex items-center justify-between 
          ${mode === "dark" ? "text-white" : "text-gray-800"}`}
        >
          {type === "Survivors" ? infectedUsers.length : data.length}
          {type === "Survivors" && (
            <Chip
              label={`${(infectedUsers.length / data.length || 0) * 100}%`}
              className="ml-2"
              color={status === "Healthy" ? "success" : "error"}
              variant="outlined"
              size="small"
            />
          )}
        </div>
        <p
          className={`font-bold text-sm mt-2 
          ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}
        >
          {status} {type}
        </p>
        <p
          className={`mt-1 text-sm 
          ${mode === "dark" ? "text-gray-300" : "text-gray-500"}`}
        >
          The total number of{" "}
          {type === "Survivors" ? `${status} survivors` : "items"}.
        </p>
      </div>
      <div
        className={`p-3 flex justify-between items-center flex-grow
        ${mode === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <span
          className={`text-xs 
          ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}
        >
          {type === "Survivors" && `Out of ${data.length} survivors`}
        </span>
        <Button
          onClick={() => setCurrentPage(type)}
          variant="contained"
          size="small"
          className={`${
            mode === "dark"
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
