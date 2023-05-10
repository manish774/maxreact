import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from './Constants/Countercontants';
import Tree from './Component/Tree';

function App() {
  const counter = useSelector((state)=>state.counter);
  const dispatch = useDispatch()
  console.log(counter);
  const incrementHandler = () =>{
    dispatch({type:CONSTANTS.INC})
  }
  const incrementHandlerWithAny = ()=>{
    dispatch({type:CONSTANTS.INCBYANY,payload:4})
  }
  return (
    <div className="App">
      helo{counter}
      <button onClick={incrementHandler}>inc</button>
      <button onClick={incrementHandlerWithAny}>inc by any</button>
      <Tree/>
    </div>
  );
}

export default App;
