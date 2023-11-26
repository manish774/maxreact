import React, { useState, useEffect, useRef } from "react";
import { ColumnProps } from "../../Model/Default";

interface RowProps {
  record: any;
  column: ColumnProps;
}
const TableRows = ({ record, column }: RowProps) => {
  const [showRowOptions, setShowRowOptions] = useState<boolean>(false);
  const rowOptionsRef = useRef(null);

  const toggleOptions = () => {
    setShowRowOptions(!showRowOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        rowOptionsRef.current &&
        //@ts-ignore
        !rowOptionsRef?.current?.contains(event?.target)
      ) {
        setShowRowOptions(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [rowOptionsRef]);

  const prepareOptionsView = () => {
    return (
      <span style={{ float: "right" }} ref={rowOptionsRef}>
        {column?.hoverAction ? (
          <div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleOptions();
              }}
              className="cursor-pointer"
            >
              ...
            </div>
            {showRowOptions && (
              <span className="panel-simple" style={{ position: "absolute" }}>
                {column?.hoverAction.map((option) => (
                  <option
                    key={option.name}
                    className={`cursor-pointer drop-options`}
                    onClick={(e) => {
                      e.stopPropagation();
                      option?.onclick(record);
                      setShowRowOptions(false);
                    }}
                  >
                    {option.name}
                  </option>
                ))}
              </span>
            )}
          </div>
        ) : (
          ""
        )}
      </span>
    );
  };

  return (
    <td style={{ textAlign: "left" }}>
      {column?.render ? column?.render(record) : record[column?.id]}
      {prepareOptionsView()}
    </td>
  );
};

export default TableRows;
