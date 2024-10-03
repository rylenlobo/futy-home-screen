import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface MenuProps {
  handleMenuClick: () => void;
}

const menuItems = ["Home", "About", "Services", "Contact"];

const Menu = (props: MenuProps) => {
  const { handleMenuClick } = props;
  return (
    <>
      {" "}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-black"
        onClick={handleMenuClick}
      />{" "}
      <motion.div
        key="menu"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed right-0 top-0 z-50 h-full w-2/3 bg-black p-4 shadow-lg"
      >
        <div onClick={handleMenuClick}>
          <X size={35} className="text-white" />
        </div>
        <ul className="mt-14">
          {menuItems.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="mb-7 text-3xl text-white"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default Menu;
