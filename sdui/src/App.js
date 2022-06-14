import logo from './logo.svg';
import './App.css';
import Input from './Input';

function App() {
  const fun = () => {
    console.log("yes")
  }
  const DUMMY_DATA = [{ 
    elmType: "input",
    type: "text",
    name: "username",
    max: 10,
    min: 1,
    class: ["user", "hello"],
    attribute: { "data-width": "10", "data-height": "20" },
    events: [{ "onClick": "callFunc()" }],
    ev: fun.bind()
  }, {
    elmType: "input",
    type: "password",
    name: "username",
    max: 10,
    min: 1,
    class: ["user", "hello-demo"],
    attribute: { "data-width": "10", "data-height": "20" },
    ev: fun.bind()
  }];

 
  return (
    <div className="App">
      <Input DUMMY_DATA={DUMMY_DATA} />
    </div>
  );
}

export default App;
