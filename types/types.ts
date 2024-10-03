export type Match = {
  team1: string;
  team2: string;
  date: Date;
  time: string;
  coins: number;
};

export type MatchStatus = "upcoming" | "live" | "completed";
