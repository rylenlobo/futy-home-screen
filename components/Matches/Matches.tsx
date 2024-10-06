"use client";
import React, { useMemo } from "react";
import type { Match } from "@/types/types";
import useMatchesStore from "@/store/matchesStore";
import MatchCard from "./MatchCard";
import MatchStatus from "./MatchStatus";
import { AnimatePresence, motion } from "framer-motion";


const Matches = () => {
  const { matches, matchStatus } = useMatchesStore((state) => state);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const filterMatchesByStatus = (matches: Match[], status: string) => {
    const today = new Date();

    return matches.filter((match: Match) => {
      if (status === "upcoming") {
        return match.date > today;
      } else if (status === "live") {
        return match.date.toDateString() === today.toDateString();
      } else if (status === "completed") {
        return match.date < today;
      }
      return false;
    });
  };

  const groupedMatchesByStatus = useMemo(() => {
    return Object.keys(matches).reduce(
      (acc, dateKey) => {
        const filteredMatches = filterMatchesByStatus(
          matches[dateKey],
          matchStatus,
        );
        if (filteredMatches.length > 0) {
          acc[dateKey] = filteredMatches;
        }
        return acc;
      },
      {} as Record<string, Match[]>,
    );
  }, [matches, matchStatus]);

  return (
    <>
      <div className="relative flex h-full w-screen flex-col pb-16 pl-3 pt-24">
        <MatchStatus />

        <div className="pt-4">
          {Object.keys(groupedMatchesByStatus).length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-lg text-gray-500">
                No {matchStatus} Matches
              </div>
            </div>
          ) : (
            Object.keys(groupedMatchesByStatus).map(
              (dateKey, index) =>
                groupedMatchesByStatus[dateKey].length > 0 && (
                  <section key={index} className="mb-8">
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-full bg-gray-200 px-4 py-2 text-sm font-bold text-gray-700">
                        {new Date(dateKey)
                          .toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                          .replace(/,/g, "")
                          .toUpperCase()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                      <AnimatePresence initial={false} mode="wait">
                        {groupedMatchesByStatus[dateKey].map((match) => (
                          <motion.div
                            key={
                              match.team1 +
                              match.team2 +
                              match.date +
                              match.coins
                            }
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={variants}
                            transition={{ duration: 0.3 }}
                          >
                            <MatchCard {...match} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </section>
                ),
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Matches;
