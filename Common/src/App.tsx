import React, { useEffect, useMemo, useState } from "react";
import DATA from "./mocks/data.json";
import trip from "./mocks/Trip.json";
import "./style.css";
import Table from "./components/Table";
import Cards from "./components/Cards";
import { ColumnProps, tableConfig } from "./Model/Default";
import "./Neu/default.scss";

const App = () => {
  const [selectedRow, setSelectedRow] = useState();
  const [data, setData] = useState(trip);
  const onClickName = (param: any) => {
    setSelectedRow({ ...param });
  };

  const getDeepDetails = (param: any) => {
    setSelectedRow({ ...param });
  };

  const deleteRecord = (record: any) => {
    //setData((prev) => data.filter((d) => d.id !== record.id));
  };

  // useEffect(() => {

  // }, [data, deleteRecord]);
  const tableConfig: tableConfig = {
    paginationRequired: true,
    showHeaderCount: false,
    title: <h3>Beautiful title</h3>,
    columns: [
      {
        id: "name",
        name: "User name",

        searchable: true,
        sortable: true,
        hoverAction: [
          { name: "Show details", onclick: (item) => getDeepDetails(item) },
          { name: "Show", onclick: (item) => getDeepDetails(item) },
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
        hoverAction: [
          { name: "Delete record", onclick: (item) => deleteRecord(item) },
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

  // __________________________________
  // Trip
  const tripConfig: tableConfig = {
    paginationRequired: true,
    showHeaderCount: false,
    title: <h3>Beautiful title</h3>,
    columns: [
      {
        id: "name",
        name: "User name",
        searchable: true,
        sortable: true,
        hoverAction: [
          { name: "Show details", onclick: (item) => getDeepDetails(item) },
        ],
      },
      {
        id: "timing",
        name: "Open Time",
      },
      {
        id: "day",
        name: "Day To visit",
        sortable: true,
      },
      {
        id: "activities",
        name: "Activities to do",

        render: (item: any) =>
          item?.activities?.map((activity: any) => {
            return <li>{activity}</li>;
          }),
      },
    ],
  };
  // ____________________________________
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "60%" }}>
        {/* <Table records={data || []} pageSize={10} config={tableConfig} /> */}
        <Table records={data || []} pageSize={10} config={tripConfig} />
      </div>
      <div style={{ width: "30%" }}>
        {selectedRow && (
          <Cards
            dictionary={selectedRow}
            listHeading={{ name: "User stat", value: "values" }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
