import React, { useEffect, useMemo, useState } from "react";
import DATA from "./mocks/data.json";
import "./style.css";
import Table from "./components/Table";
import Cards from "./components/Cards";
import { ColumnProps } from "./Model/TableModel";
import "./Neu/default.css";
import { tableConfig } from "./Model/Default";
const App = () => {
  const [selectedRow, setSelectedRow] = useState();

  const onClickName = (param: any) => {
    setSelectedRow({ ...param });
  };

  const getDeepDetails = (param: any) => {
    setSelectedRow({ ...param });
  };
  const tableConfig: tableConfig = {
    title: <h3>Beautiful title</h3>,
    columns: [
      {
        id: "name",
        name: "User name",

        searchable: true,
        sortable: true,
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
        hoverAction: [
          { name: "Show details", onclick: (item) => getDeepDetails(item) },
          { name: "Show", onclick: (item) => getDeepDetails(item) },
        ],
      },
    ],
  };

  const listConfig = [
    {
      id: "img",
      name: "Image",
      render: (item: any) => {
        return <img src={item?.img} height="20px" width="20px" />;
      },
    },
    {
      id: "age",
      name: "Age",
    },
    {
      id: "amount",
      name: "Percentage Covered",
      render: (item: any) => {
        return `${Math.round(item?.amount / 100)}%`;
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
