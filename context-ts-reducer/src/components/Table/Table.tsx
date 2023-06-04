import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../Utils";
import "./Table.scss";
import Input from "../Input/Input";
interface Columns {
  id: string;
  name: string;
}
interface TableProps {
  data: any;
  columns: Columns[];
  checkBox?: boolean;
  onCheck?: any;
}
const Table = ({ data, columns, checkBox = false, onCheck }: TableProps) => {
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    const addCheckBoxToData =
      data?.map((d: any) => {
        return { ...d, checked: d.checked || false };
      }) || [];
    setTableData(addCheckBoxToData);
  }, [data]);

  const selectAll = (e: any) => {
    const addCheckBoxToData =
      tableData?.map((d: any) => {
        return { ...d, checked: e.target.checked };
      }) || [];
    setTableData(addCheckBoxToData);
  };

  const prepareTableCoulmns = () => {
    return (
      <>
        {checkBox && (
          <th>
            <input type="checkbox" onChange={selectAll} />
          </th>
        )}
        {columns.map((d) => (
          <th>{capitalizeFirstLetter(d.name)}</th>
        ))}
      </>
    );
  };

  const handleCheck = (val: any) => {
    debugger;
    const checkRow = tableData.map((item: any) => {
      if (item[columns[0]?.name] === val?.target?.value) {
        return { ...item, checked: val?.target?.checked };
      }
      return item;
    });
    setTableData(checkRow);
    const selectedData = tableData.filter(
      (d: any) => d[columns[0].name] == val.target.value
    );
    onCheck && onCheck(selectedData);
  };

  const prepareTableData = () => {
    const columnArrays = columns.map((cols) => cols.name);
    const dataCoulmns = Object.keys(data[0]);

    return tableData.map((d: any) => {
      return (
        <tr>
          {checkBox && (
            <td>
              <input
                type="checkbox"
                onChange={handleCheck}
                value={d[columns[0].name]}
                checked={d.checked}
              />
            </td>
          )}
          {dataCoulmns.map((dc) => {
            if (columnArrays.includes(dc)) {
              return <td>{d[dc]}</td>;
            }
          })}
        </tr>
      );
    });
  };

  return (
    <div>
      <table className="table">
        {tableData.length ? (
          <>
            <thead>
              <tr>{prepareTableCoulmns()}</tr>
            </thead>
            <tbody>{prepareTableData()}</tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td>No Item aavailable</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
