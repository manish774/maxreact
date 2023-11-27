// Tree.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TreeRows from "./TreeRows";
import "../generic/Table/Table.scss";
import "../../Neu/default.scss";
import { TableProps, ThemeMode } from "../../Model/Default";
import { TableHeader } from "../generic/Table/TableHeader";
import TableFooter from "../generic/Table/TableFooter";
import { paginationOptions } from "../../utils/TableUtils";
import { useDebounce } from "../../hooks/hooks";
import { ASC, DESC, selectSubarray, sortRecords } from "../../utils/Index";

const Tree = ({ records, config, pageSize }: TableProps) => {
  const [expandedRows, setExpandedRows] = useState<any>([]);
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

  const { columns, title } = config;

  const toggleExpand = (index: any) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i: any) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const sortableColumns = useMemo(
    () => columns.filter((col) => col?.sortable === true).map((co) => co.id),
    [columns]
  );

  const sortColumn = (key: string, order: string) => {
    setCompleteRecord(sortRecords(completeRecord, key, order));
  };

  const searchableColumns = useMemo(
    () => columns.filter((col) => col?.searchable === true).map((co) => co.id),
    [columns]
  );

  const getTotalPage = (rec: any[]) => {
    return Math.ceil(rec?.length / itemPerPage);
  };

  const [currentIndexes, setCurrentIndexes] = useState({
    startIndex: 0,
    offset: itemPerPage,
  });

  const prepareTreeRows = (data: any, isChildren: any, depth: any) => {
    return data.map((d: any, index: number) => {
      console.log(Object.keys(columns), d);

      const col = Object.keys(columns[0]);
      const random = Math.random();
      const isRowExpanded = expandedRows.includes(
        `${depth}_${index}_${d[col[0]]}`
      );
      return (
        <React.Fragment key={`${depth}_${index}`}>
          <TreeRows
            rowData={d}
            depth={depth}
            isExpanded={isRowExpanded}
            onToggleExpand={() =>
              toggleExpand(`${depth}_${index}_${d[col[0]]}`)
            }
            index={`${depth}_${index}_${d[col[0]]}`}
            columns={columns}
            data-cy={`${depth}_${index}_${d[col[0]]}`}
          />
          {isRowExpanded &&
            d?.children &&
            prepareTreeRows(d?.children, true, depth + 10)}
        </React.Fragment>
      );
    });
  };

  const tableRows = prepareTreeRows(currentRecord, false, 0);

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
          key={rec?.id}
        >
          {rec?.name}
        </th>
      ));
    });
  }, [columnSortState, completeRecord, itemPerPage]);
  const searchInTable = useCallback(
    (e: any) => {
      config?.paginationRequired && setCurrentPagination(1);
      setSearchText(e?.target?.value);
    },
    [columnNames, itemPerPage]
  );

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

  const handleInputChange = (e: any) => {
    if (e?.target?.value > totalPage) return e.preventDefault();
    if (e?.target?.value) setCurrentPagination(() => e.target.value);
    // setFind(e.target.value);
  };

  const changeItemPerPage = (e: any) => {
    setItemPerPage(parseInt(e?.target?.value));
  };

  useEffect(() => {
    const paginatedRecords = selectSubarray(
      completeRecord,
      currentIndexes?.startIndex,
      currentIndexes?.offset
    );
    setCurrentRecords(paginatedRecords);
  }, [currentPagination, completeRecord, currentIndexes]);

  const clearInput = () => {
    setSearchText("");
  };

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const table = (
    <div>
      <TableHeader
        searchInTable={searchInTable}
        title={title}
        clearInput={clearInput}
        searchText={searchText}
        mode={""}
        changeTheme={changeTheme}
      />
      <table>
        <thead>
          <tr>{columnNames}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <TableFooter
        rowCount={rowCount}
        handleInputChange={handleInputChange}
        totalPage={totalPage}
        currentPagination={currentPagination}
        paginationRequired={config?.paginationRequired}
        changeItemPerPage={changeItemPerPage}
        paginationOptions={paginationOptions}
        itemPerPage={itemPerPage}
      />
    </div>
  );

  return <div className={`table-container`}>{table}</div>;
};

export default Tree;
