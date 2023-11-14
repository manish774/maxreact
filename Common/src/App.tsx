import React, { useEffect, useMemo, useState } from "react";
import DATA from "./mocks/data.json";
import "./style.css";
import Table from "./components/Table";
import Cards from "./components/Cards";
import { ColumnProps } from "./Model/TableModel";

interface tableConfig {
  title: JSX.Element;
  columns: ColumnProps[];
}
const App = () => {
  const [selectedRow, setSelectedRow] = useState();
  const onClickName = (param: any) => {
    setSelectedRow({ ...param });
  };

  const getDeepDetails = () => {};
  const tableConfig: tableConfig = {
    title: <h3>Beautiful title</h3>,
    columns: [
      {
        id: "name",
        name: "User name",
        render: (item: any) => {
          return (
            <a href="#" onClick={() => onClickName(item)}>
              {item?.name}
            </a>
          );
        },
        searchable: true,
        sortable: true,
        hoverAction: [
          { name: "Show details", oncilck: getDeepDetails },
          { name: "Show", oncilck: getDeepDetails },
        ],
      },
      {
        id: "age",
        name: "User age",
        render: (item: any) => {
          return item?.age;
        },
        searchable: true,
        sortable: true,
      },
      {
        id: "img",
        name: "Icon",
        render: (item: any) => {
          return <img src={item?.img} height="20px" width="20px" />;
        },
      },
      {
        id: "amount",
        name: "Value",
        searchable: true,
      },
    ],
  };

  const listConfig = [
    {
      id: "img",
      render: (item: any) => {
        return <img src={item?.img} height="20px" width="20px" />;
      },
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "60%" }}>
        <Table records={DATA || []} pageSize={10} config={tableConfig} />
      </div>
      <div style={{ width: "30%" }}>
        {selectedRow && (
          <Cards
            dictionary={selectedRow}
            listHeading={{ name: "User stat", value: "values" }}
            config={listConfig}
          />
        )}
      </div>
    </div>
  );
};

export default App;
