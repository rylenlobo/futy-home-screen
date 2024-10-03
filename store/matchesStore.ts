import { create } from "zustand";
import { matches } from "@/data/matches";
import { MatchStatus } from "@/types/types";

interface Match {
  team1: string;
  team2: string;
  date: Date;
  time: string;
  coins: number;
}

interface MatchesStore {
  matches: Record<string, Match[]>;
  setMatches: (searchQuery: string) => void;

  matchStatus: MatchStatus;
  setMatchStatus: (status: MatchStatus) => void;
}

const groupedMatches = (matches: Match[]) => {
  return matches.reduce(
    (acc, match) => {
      const dateKey = match.date.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(match);
      return acc;
    },
    {} as Record<string, Match[]>,
  );
};

const useMatchesStore = create<MatchesStore>((set) => ({
  matches: groupedMatches(matches),
  setMatches: (searchQuery: string) =>
    set((state) => {
      if (searchQuery === "") {
        return { matches: groupedMatches(matches) };
      }

      // Split the search query into individual terms and create a regex pattern
      const terms = searchQuery.split(/\s+/).filter(Boolean);
      const regex = new RegExp(terms.join("|"), "i"); // Create a case-insensitive regex

      return {
        matches: Object.fromEntries(
          Object.entries(state.matches).map(([date, matches]) => [
            date,
            matches.filter(
              (match: Match) =>
                regex.test(match.team1) ||
                regex.test(match.team2) ||
                regex.test(
                  match.date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  }),
                ),
            ),
          ]),
        ),
      };
    }),

  matchStatus: "upcoming" as MatchStatus,
  setMatchStatus: (status: MatchStatus) => set({ matchStatus: status }),
}));

export default useMatchesStore;
