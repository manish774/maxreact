import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Spider from "./Spider";
import PassComponent from "./PassComponent";

function App() {
  const [items, setItems] = useState([
    { name: "manish", data: { item: "Apple" }, id: 1 },
    { name: "priya", data: { item: "Pinapple" }, id: 2 },
    { name: "priya", data: {}, id: 2 },
    { name: "priya", data: { item: "Banana" }, id: 2 },
  ]);

  const itemData = items.map((friuits) => {
    if (friuits.hasOwnProperty("data")) {
      return friuits.data.item;
    }
  });
  //const name=items.map((item)=>{return <li>{item.}</li>})
  return (
    <div>
      {/* <ul>{itemData}</ul> */}
      <PassComponent />
    </div>
  );
}

export default App;
