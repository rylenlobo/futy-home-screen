"use client";
import React, { useEffect } from "react";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/utils/utils";
import useMatchesStore from "@/store/matchesStore";

const Search = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setMatches } = useMatchesStore();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    navigator.vibrate(30);
  };

  const handleBlur = () => {
    setIsSearchOpen(!isSearchOpen);
    setMatches("");
  };

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  return (
    <div className="relative flex h-full items-center justify-center">
      <AnimatePresence>
        {isSearchOpen && (
          <motion.input
            ref={inputRef}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "h-full rounded-full border-2 bg-transparent px-3 pr-9 text-white placeholder-slate-200",
            )}
            type="text"
            onBlur={handleBlur}
            placeholder="MUN vs CHE"
            onChange={(e) => setMatches(e.target.value)}
          />
        )}
      </AnimatePresence>
      <motion.div
        whileTap={{ scale: 0.8 }}
        onClick={handleSearchIconClick}
        className="absolute right-2.5 z-50 cursor-pointer"
      >
        <SearchIcon size={28} />
      </motion.div>
    </div>
  );
};

export default Search;
