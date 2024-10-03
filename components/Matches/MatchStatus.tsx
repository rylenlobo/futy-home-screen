import React from "react";
import useMatchesStore from "@/store/matchesStore";

const getButtonClasses = (matchStatus: string, status: string) => {
  const baseClasses =
    "flex items-center rounded-full px-4 py-2 text-white cursor-pointer transition-transform duration-300 box-border";
  const selectedClasses = "border-2 border-white bg-black";
  const unselectedClasses = "bg-black";

  return `${baseClasses} ${
    matchStatus === status ? selectedClasses : unselectedClasses
  }`;
};

const MatchStatus = () => {
  const { matchStatus, setMatchStatus } = useMatchesStore();

  return (
    <div className="flex gap-5">
      <div
        className={getButtonClasses(matchStatus, "upcoming")}
        onClick={() => setMatchStatus("upcoming")}
      >
        Upcoming
      </div>
      <div
        className={getButtonClasses(matchStatus, "live")}
        onClick={() => setMatchStatus("live")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
        Live
      </div>
      <div
        className={getButtonClasses(matchStatus, "completed")}
        onClick={() => setMatchStatus("completed")}
      >
        Completed
      </div>
    </div>
  );
};

export default MatchStatus;
