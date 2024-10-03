"use client";
import React, { useState } from "react";
import { Home, Gamepad, User, Settings } from "lucide-react";

const Navbar = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    navigator.vibrate(10);
  };

  const options = [
    { name: "Home", icon: <Home /> },
    { name: "Games", icon: <Gamepad /> },
    { name: "Profile", icon: <User /> },
    { name: "Settings", icon: <Settings /> },
  ];

  return (
    <div className="fixed bottom-0 flex w-full justify-around bg-black py-4 text-white">
      {options.map((option) => (
        <div
          key={option.name}
          className="flex cursor-pointer flex-col items-center"
          onClick={() => handleSelect(option.name)}
        >
          <div
            className={`mb-2 transition-transform ${selected === option.name ? "scale-150" : ""}`}
          >
            {option.icon}
          </div>
          <span>{option.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
