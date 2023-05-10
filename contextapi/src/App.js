import logo from "./logo.svg";
import UserProvider from "./context/userProvider";
import Users from "./Users";
import Child from "./context/Child";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Users />
      <Child />
    </UserProvider>
  );
}

export default App;
