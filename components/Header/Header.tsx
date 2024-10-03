"use client";
import { UserRound, Menu as MenuIcon } from "lucide-react";
import Search from "./Search";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Menu from "./Menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    navigator.vibrate(30);
  };

  return (
    <header className="fixed z-40 flex w-full items-center border-b-2 border-b-white bg-black px-2 py-4">
      <div className="flex h-10 items-center gap-2">
        <div className="rounded-full border-2 border-white bg-white text-stone-950">
          <UserRound size={35} />
        </div>
        <div className="text flex h-full items-center justify-center gap-2 rounded-full border-2 border-orange-600 px-1 font-extrabold text-orange-600">
          <div
            style={{ scale: 0.8 }}
            className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-orange-600 text-sm font-bold italic"
          >
            F
          </div>
          <p className="mr-2">50</p>
        </div>
      </div>
      <div className="ml-auto flex h-10 items-center gap-2">
        <Search />
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          whileTap={{ scale: 0.8 }}
          exit={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MenuIcon size={35} onClick={handleMenuClick} />
        </motion.div>
        <AnimatePresence>
          {isMenuOpen && <Menu handleMenuClick={handleMenuClick} />}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
