import React from "react";

type ScrollbarProps = {
  children: React.ReactNode;
};

const Scrollbar = ({ children }: ScrollbarProps) => {
  return (
    <div className="container">
      <div className="overflow-hidden">{children}</div>
      <div className="scrollbar">
        <button className="button-up">↑</button>

        <button className="button-up">↓</button>
      </div>
    </div>
  );
};

export default Scrollbar;
