import React, { useEffect } from "react";
import { MyContextProvider, useMyContext } from "./store/CounterReducer";

import Neu from "./components/neumor/Neumorphism";
import UserTable from "./View/UserTable";
import Cards from "./components/Cards/Cards";
import Table from "./components/Table/Table";
import "./App.scss";
import { BulletList } from "react-content-loader";
const App: React.FC = () => {
  return (
    <MyContextProvider>
      <>
        <div className="home-header"></div>
        <div className="home-container">
          <div>
            <Neu
              header={{ label: "List Of users", align: "left" }}
              children={<UserTable />}
              height="auto"
            />
          </div>
          <div>
            <Cards title="Dashboard" children={<div>Test</div>} />
          </div>
          <div>
            <Table data={[]} columns={[]} />
          </div>
        </div>
      </>
    </MyContextProvider>
  );
};

export default App;
