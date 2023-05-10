import React from "react";
const ThemeContext = React.createContext<Object>({
  color: "red",
  setTheme: () => {},
});

export { ThemeContext };
