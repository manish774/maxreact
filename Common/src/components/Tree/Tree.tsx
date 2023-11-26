// Tree.jsx
import React, { useState } from "react";
import TreeRows from "./TreeRows";
import "../generic/Table/Table.scss";
import "../../Neu/default.scss";
import { TableProps } from "../../Model/Default";

const Tree = ({ records, config, pageSize }: TableProps) => {
  const [expandedRows, setExpandedRows] = useState<any>([]);
  const { columns, title } = config;

  const toggleExpand = (index: any) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i: any) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const prepareTreeRows = (data: any, isChildren: any, depth: any) => {
    return data.map((d: any, index: number) => {
      const isRowExpanded = expandedRows.includes(`${depth}_${index}`);
      return (
        <React.Fragment key={`${depth}_${index}`}>
          <TreeRows
            rowData={d}
            depth={depth}
            isExpanded={isRowExpanded}
            onToggleExpand={() => toggleExpand(`${depth}_${index}`)}
            index={`${depth}_${index}`}
          />
          {isRowExpanded &&
            d?.children &&
            prepareTreeRows(d?.children, true, depth + 10)}
        </React.Fragment>
      );
    });
  };

  const tableRows = prepareTreeRows(records, false, 0);

  const table = (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th>Shop name</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );

  return <div className={`table-container`}>{table}</div>;
};

export default Tree;
