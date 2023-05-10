import logo from './logo.svg';
import './App.css';
import User from './User';
import ErrorBoundries from './ErrorHandle/ErrorBoundries';

function App() {
  const arrList = ['ABC','manish','BCD'].map(list=><ErrorBoundries key={list}><User name={list}/></ErrorBoundries>);
  
  return (
    <div className="App">
      {arrList}
    </div>
  );
}

export default App;
