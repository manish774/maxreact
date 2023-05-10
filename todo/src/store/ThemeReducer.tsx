import React, { useEffect, useState } from "react";

import { ThemeContext } from "./ThemeContext";
import { ReactChildren } from "../components/model";
const ThemeReducer = ({ children }: ReactChildren) => {
  const [bgColor, setBgColor] = useState({ color: "red" });
  useEffect(() => {}, [bgColor]);
  const setTheme = (value: any) => {
    console.log("first");
    setBgColor({ color: value });
  };

  return (
    <ThemeContext.Provider value={{ color: bgColor.color, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeReducer;
