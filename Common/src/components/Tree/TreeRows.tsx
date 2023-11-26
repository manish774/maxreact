// TreeRows.jsx
import React from "react";

const TreeRows = ({
  rowData,
  depth,
  isExpanded,
  onToggleExpand,
  index,
}: any) => {
  return (
    <tr>
      <td width={"400px"} height={"30px"}>
        <span
          style={{
            marginLeft: rowData?.children ? `${depth}px` : `${depth}px`,
          }}
        >
          <span
            onClick={onToggleExpand}
            data-id={index}
            style={{ cursor: "pointer" }}
          >
            {rowData?.children && (isExpanded ? "- " : "+ ")}
          </span>
          <span style={{ marginLeft: rowData?.children ? "0px" : "15px" }}>
            {rowData?.name}
          </span>
        </span>
      </td>
      <td>{rowData?.id}</td>
      <td>{rowData?.shopName}</td>
    </tr>
  );
};

export default TreeRows;
