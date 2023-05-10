import React, { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";
const ThemeChanger = () => {
  const ctx = useContext<any>(ThemeContext);

  const changeBackground = (e: any) => {
    ctx.setTheme(e.target.value);
  };

  return (
    <div>
      <input type="color" onChange={changeBackground} />
    </div>
  );
};

export default ThemeChanger;
