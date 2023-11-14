import React, { useCallback, useEffect, useMemo, useState } from "react";
import { selectSubarray, sortRecords } from "../utils/Index";
import "./Table.css";
import "../Neu/default.css";
import { paginationOptions } from "../utils/TableUtils";
import { ASC, DESC } from "../utils/Index";
import { TableProps, ColumnProps } from "../Model/TableModel";

const Table = ({ records, config }: TableProps) => {
  const [currentPagination, setCurrentPagination] = useState<any>(1);
  const [currentRecord, setCurrentRecords] = useState<any>([]);
  const [completeRecord, setCompleteRecord] = useState(records || []);
  const [rowCount, setRowCount] = useState(records?.length || 0);
  const [columnSortState, setColumnSortState] = useState<any>({});
  const [columnNames, setColumnNames] = useState<any>();
  const [itemPerPage, setItemPerPage] = useState(paginationOptions[1]);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(completeRecord?.length / itemPerPage)
  );
  const [currentIndexes, setCurrentIndexes] = useState({
    startIndex: 0,
    offset: itemPerPage,
  });

  const [find, setFind] = useState<string>(""); //to-do: use it in useEffect
  const [showRowOptions, setShowRowOptions] = useState(-1);

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
    sortableColumns.forEach((col: any) => {
      sortColumnObject[col] = ASC;
    }, []);

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
              setColumnSortState((prevColumnSortState: any) => {
                return {
                  ...prevColumnSortState,
                  [rec?.id]: columnSortState[rec?.id] === ASC ? DESC : ASC,
                };
              });
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

  const searchInTable = useCallback(
    (e: any) => {
      setCurrentPagination(1);
      if (e?.target?.value) {
        const newRecords = records?.filter((rec: any) => {
          const searchValue = e?.target?.value?.toString().toLowerCase();
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
        setCurrentIndexes({ startIndex: 0, offset: itemPerPage });
        setTotalPage(getTotalPage(records));
        setRowCount(records?.length);
      }
    },
    [columnNames, itemPerPage]
  );

  const handleInputChange = (e: any) => {
    if (e?.target?.value > totalPage) return e.preventDefault();
    if (e?.target?.value) setCurrentPagination((prev: any) => e.target.value);
    // setFind(e.target.value);
  };

  const createCellContent = (record: any, column: ColumnProps) => {
    if (column?.render) {
      const isRowSelected = showRowOptions === record.id;
      return (
        <td style={{ textAlign: "left" }}>
          {column?.render(record)}
          <span style={{ float: "right" }}>
            {column?.hoverAction ? (
              <div>
                <div onClick={() => setShowRowOptions(record?.id)}>...</div>
                {isRowSelected && (
                  <>
                    {column?.hoverAction.map((option) => (
                      <option>{option.name}</option>
                    ))}
                  </>
                )}
              </div>
            ) : (
              ""
            )}
          </span>
        </td>
      );
    } else {
      return <td>{record[column?.id]}</td>;
    }
  };

  const rows = currentRecord?.map((record: any) => {
    return <tr>{columns?.map((col) => createCellContent(record, col))}</tr>;
  });

  const changeItemPerPage = (e: any) => {
    setItemPerPage(parseInt(e?.target?.value));
  };
  const clearInput = () => {};

  useEffect(() => {
    setTotalPage(Math.ceil(completeRecord?.length / itemPerPage));
  }, [itemPerPage, currentRecord]);
  return (
    <div className="table-container">
      <div className="footer-container">
        <div className="table-title">{title}</div>
        <div className="table-search">
          <div className="input-container" style={{ textAlign: "right" }}>
            <input
              className="search"
              onBlur={searchInTable}
              placeholder="search"
            />
            <button className="clear-button" onClick={clearInput}>
              &times;
            </button>
          </div>
        </div>
      </div>
      <div className="table-main">
        <table>
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
        <div className="table-pagination">
          <div className="input-container">
            <input
              value={currentPagination}
              type="number"
              onChange={handleInputChange}
              max={totalPage}
              min={1}
            />
            <span style={{ marginLeft: "5px" }}>out of {totalPage}</span>
          </div>
        </div>
        <div className="input-container">
          <select onChange={changeItemPerPage}>
            {paginationOptions.map((page) => (
              <option selected={itemPerPage === page}>{page}</option>
            ))}
          </select>
          <span style={{ marginLeft: "5px" }}>Item per page {totalPage}</span>
        </div>
      </div>
    </div>
  );
};

export default Table;
