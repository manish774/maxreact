import React, { useCallback, useEffect, useMemo, useState } from "react";
import { selectSubarray, sortRecords } from "../../utils/Index";
import "../generic/Table/Table.scss";
import "../../Neu/default.scss";
import { paginationOptions } from "../../utils/TableUtils";
import { ASC, DESC } from "../../utils/Index";

import { TableProps, ColumnProps, ThemeMode } from "../../Model/Default";
import TableRows from "./TableRows";
import { useDebounce } from "../../hooks/hooks";
import Toggle from "../Toggle";
import Input from "../generic/Input";
import Select from "../generic/Select";

const Table = ({ records, config }: TableProps) => {
  const [currentPagination, setCurrentPagination] = useState<any>(1);
  const [currentRecord, setCurrentRecords] = useState<any>([]);
  const [completeRecord, setCompleteRecord] = useState(records || []);
  const [rowCount, setRowCount] = useState(records?.length || 0);
  const [columnSortState, setColumnSortState] = useState<any>({});
  const [columnNames, setColumnNames] = useState<any>();
  const [itemPerPage, setItemPerPage] = useState(paginationOptions[0]);
  const [searchText, setSearchText] = useState<string>("");
  const debounceSearch = useDebounce(searchText, 1000);
  const [searchInputLoading, setSearchInputLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const debounceTheme = useDebounce(theme, 2000);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(completeRecord?.length / itemPerPage)
  );

  const [currentIndexes, setCurrentIndexes] = useState({
    startIndex: 0,
    offset: itemPerPage,
  });

  const [find, setFind] = useState<string>(""); //to-do: use it in useEffect

  const { columns, title } = config; //To-do : make column name form this column and values from column render

  const sortableColumns = useMemo(
    () => columns.filter((col) => col?.sortable === true).map((co) => co.id),
    [columns]
  );

  const sortColumn = (key: string, order: string) => {
    setCompleteRecord(sortRecords(completeRecord, key, order));
  };

  useEffect(() => {
    const sortColumnObject: any = {};
    // sortableColumns.forEach((col: any) => {
    //   sortColumnObject[col] = ASC;
    // }, []);

    setColumnSortState((prevColumnSortState: any) => {
      return { ...prevColumnSortState, ...sortColumnObject };
    });
  }, []);

  useEffect(() => {
    setColumnNames(() => {
      return columns.map((rec) => (
        <th
          onClick={() => {
            if (sortableColumns.includes(rec?.id)) {
              sortColumn(rec?.id, columnSortState[rec?.id]);
              setColumnSortState(() => ({
                [rec?.id]: columnSortState[rec?.id] === ASC ? DESC : ASC,
              }));
            }
          }}
          className={`sort ${columnSortState[rec?.id]}`}
        >
          {rec?.name}
        </th>
      ));
    });
  }, [columnSortState, completeRecord, itemPerPage]);

  const searchableColumns = useMemo(
    () => columns.filter((col) => col?.searchable === true).map((co) => co.id),
    [columns]
  );

  const getTotalPage = (rec: any[]) => {
    return Math.ceil(rec?.length / itemPerPage);
  };

  useEffect(() => {
    let start = itemPerPage * currentPagination - itemPerPage;
    let end = itemPerPage * currentPagination - 1;
    setCurrentIndexes({ startIndex: start, offset: end });
  }, [currentPagination, itemPerPage]);

  useEffect(() => {
    const paginatedRecords = selectSubarray(
      completeRecord,
      currentIndexes?.startIndex,
      currentIndexes?.offset
    );
    setCurrentRecords(paginatedRecords);
  }, [currentPagination, completeRecord, currentIndexes]);

  useEffect(() => {
    if (searchText) {
      const newRecords = records?.filter((rec: any) => {
        const searchValue = searchText?.toString().toLowerCase();
        return searchableColumns.some((column) => {
          const columnValue = rec[column]?.toString()?.toLowerCase();
          return columnValue?.includes(searchValue);
        });
      });
      setCompleteRecord(newRecords);
      setTotalPage(getTotalPage(newRecords));
      setRowCount(newRecords?.length);
    } else {
      setCompleteRecord(records);
      setCurrentIndexes({ startIndex: 0, offset: itemPerPage - 1 });
      setTotalPage(getTotalPage(records));
      setRowCount(records?.length);
    }
  }, [debounceSearch, records, searchableColumns, itemPerPage]);

  const searchInTable = useCallback(
    (e: any) => {
      setCurrentPagination(1);
      setSearchText(e?.target?.value);
    },
    [columnNames, itemPerPage]
  );

  const handleInputChange = (e: any) => {
    if (e?.target?.value > totalPage) return e.preventDefault();
    if (e?.target?.value) setCurrentPagination((prev: any) => e.target.value);
    // setFind(e.target.value);
  };

  const createCellContent = (record: any, column: ColumnProps) => {
    return <TableRows record={record} column={column} />;
  };

  const rows = currentRecord?.map((record: any) => {
    return <tr>{columns?.map((col) => createCellContent(record, col))}</tr>;
  });

  const changeItemPerPage = (e: any) => {
    setItemPerPage(parseInt(e?.target?.value));
  };
  const clearInput = () => {
    setSearchText("");
  };

  useEffect(() => {
    setTotalPage(Math.ceil(completeRecord?.length / itemPerPage));
  }, [itemPerPage, currentRecord]);

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  return (
    <div className={`table-container ${`theme-${theme}`}`}>
      <div className="footer-container">
        <div className="table-title">{title}</div>
        <div>
          {config?.mode && (
            <div>
              <Toggle
                style={{ position: "relative", top: "0px" }}
                label="Mode"
                onChangeTheme={changeTheme}
              />
            </div>
          )}
        </div>
        <div className="table-search">
          <div className="input-container" style={{ textAlign: "right" }}>
            <input
              className="search"
              onChange={searchInTable}
              placeholder="search"
              value={searchText}
            />
            <button
              className={`clear-button ${!searchText && "display-none"}`}
              onClick={clearInput}
            >
              &times;
            </button>
          </div>
        </div>
      </div>
      <div className="table-main">
        <table style={{ minHeight: config?.minHeight || "" }}>
          <thead>
            <tr>{columnNames}</tr>
          </thead>
          <tbody>
            {rows}
            {!completeRecord?.length && (
              <tr>
                <td colSpan={3}>No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="footer-container">
        <div className="row-count">Total records ({rowCount})</div>
        {config?.paginationRequired && (
          <div className="table-pagination">
            <div className="input-container">
              <Input
                onchangeHandler={handleInputChange}
                type="number"
                max={totalPage}
                min={1}
                value={currentPagination}
              />
              <span style={{ marginLeft: "5px" }}>of {totalPage}</span>
            </div>
          </div>
        )}
        <div className="input-container">
          <Select
            onchangeHandler={changeItemPerPage}
            options={paginationOptions.map((p) => ({ name: p, value: p }))}
            selected={itemPerPage}
            label={"per page"}
          />
          {/* <select onChange={changeItemPerPage}>
            {paginationOptions.map((page) => (
              <option selected={itemPerPage === page}>{page}</option>
            ))}
          </select> */}
        </div>
      </div>
    </div>
  );
};

export default Table;
