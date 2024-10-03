import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export type MatchCardProps = {
  team1: string;
  team2: string;
  date: Date;
  time: string;
  coins: number;
};

const team1img =
  "https://ssl.gstatic.com/onebox/media/sports/logos/y1V4sm2SEBiWUPRIYl5rfg_96x96.png";

const team2img =
  "https://ssl.gstatic.com/onebox/media/sports/logos/udQ6ns69PctCv143h-GeYw_96x96.png";

const MatchCard = (props: MatchCardProps) => {
  const { team1, team2, date, time, coins } = props;
  return (
    <div className="relative w-full">
      <div className="flex flex-col items-center justify-center overflow-hidden rounded-xl bg-[#1a1a1a]">
        <div className="flex h-1 w-full items-center justify-center bg-white">
          {/* Coin Chip */}
          <div className="absolute -top-3 z-30 flex items-center justify-center gap-1 rounded-full bg-white text-black">
            <div
              style={{ scale: 0.7 }}
              className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-black text-xs font-bold italic"
            >
              F
            </div>
            <p className="text-xs font-bold">{coins}</p>
            <ChevronRight size={16} />
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-6 border-b-2 border-b-white px-2 py-3">
          <div className="flex flex-col items-center justify-center gap-1">
            <Image src={team1img} alt="team1" width={30} height={30} />
            <h6 className="text-sm font-extrabold">{team1}</h6>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-gray-300">
              {date
                .toLocaleDateString("en-US", { month: "short", day: "numeric" })
                .toUpperCase()}
            </p>
            <p className="text-base font-bold">{time}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Image src={team2img} alt="team1" width={30} height={30} />
            <h6 className="text-sm font-extrabold">{team2}</h6>
          </div>
        </div>
        <div className="w-full p-2">
          <button className="w-full rounded-lg bg-green-700 p-1 text-xs font-bold text-white">
            JOIN GAME
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
