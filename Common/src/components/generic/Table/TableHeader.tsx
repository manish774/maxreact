import React from "react";
import Toggle from "../../Toggle";
import { TableProps } from "../../../Model/Default";

export const TableHeader = ({ records, config }: TableProps) => {
  const { title } = config;
  //   return  <div className="footer-container">
  //   <div className="table-title">{title}</div>
  //   <div>
  //     {config?.mode && (
  //       <div>
  //         <Toggle
  //           style={{ position: "relative", top: "0px" }}
  //           label="Mode"
  //           onChangeTheme={changeTheme}
  //         />
  //       </div>
  //     )}
  //   </div>
  //   <div className="table-search">
  //     <div className="input-container" style={{ textAlign: "right" }}>
  //       <input
  //         className="search"
  //         onChange={searchInTable}
  //         placeholder="search"
  //         value={searchText}
  //       />
  //       <button
  //         className={`clear-button ${!searchText && "display-none"}`}
  //         onClick={clearInput}
  //       >
  //         &times;
  //       </button>
  //     </div>
  //   </div>
  // </div>/
  return <></>;
};
