import React, { useEffect, useMemo, useState } from "react";
import DATA from "./mocks/data.json";
import trip from "./mocks/Trip.json";
import "./style.css";
import Table from "./components/Table";
import Cards from "./components/Cards";
import { ColumnProps, tableConfig } from "./Model/Default";
import "./Neu/default.scss";
import Modal from "./components/Modal/Modal";
import Select from "./components/generic/Select";
import { Resizable } from "re-resizable";

const App = () => {
  const [selectedRow, setSelectedRow] = useState(trip[0]);
  const [data, setData] = useState(trip);
  const [dialogState, setDialogState] = useState<boolean>(false);
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
    title: <h3>Gokarna </h3>,
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
        searchable: true,
        hideAble: true,
        hideOnstart: true,
      },
      {
        id: "day",
        name: "Day To visit",
        sortable: true,
      },
      {
        id: "activities",
        name: "Activities to do",
        searchable: true,
        render: (item: any) =>
          item?.activities?.map((activity: any) => {
            return <li>{activity}</li>;
          }),
      },
    ],
  };
  // ____________________________________

  const openDialog = () => {
    setDialogState((prev) => (prev === false ? true : false));
  };

  const selectHandler = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <Resizable
          defaultSize={{
            width: "70%",
            height: "90%",
          }}
          style={{ border: "1px dotted gray", margin: "2px" }}
        >
          <div>
            {/* <Table records={data || []} pageSize={10} config={tableConfig} /> */}
            <Table records={data || []} pageSize={10} config={tripConfig} />
          </div>
        </Resizable>
        <Resizable
          defaultSize={{
            width: "30%",
            height: "90%",
          }}
          style={{ border: "1px dotted gray", margin: "2px" }}
        >
          {selectedRow && (
            <Cards
              dictionary={selectedRow}
              listHeading={{ name: "User stat", value: "values" }}
            />
          )}
        </Resizable>
      </div>
      <Resizable style={{ border: "1px dotted gray", margin: "2px" }}>
        <button onClick={openDialog}>Open dialog</button>
        <Modal isDialogOpen={dialogState} />
      </Resizable>
    </>
  );
};

export default App;
