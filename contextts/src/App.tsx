import "./App.css";
import { UserContextProvider } from "./store/UserContext";
import User from "./View/User";
import UserInfo from "./View/UserInfo";
function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <User />
        <UserInfo />
      </div>
    </UserContextProvider>
  );
}

export default App;
