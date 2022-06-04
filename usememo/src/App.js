import logo from './logo.svg';
import './App.css';
import { useMemo, useState } from 'react';

function App() {
  const [counterOne,seCounterOne] = useState(0);
  const [counterTwo,seCounterTwo] = useState(0);
  const incrementCounterOne = () =>{
    seCounterOne(counterOne + 1)
  }
  const incrementCounterTwo = () =>{
    seCounterTwo(counterTwo + 1)
  }
  
  const isEven = useMemo(()=>{
    let i =0;
    while(i<1000000000)i++;
    return (counterOne %2 === 0 )?"Even":"Odd";
  },[counterOne]);
  return (
    <div className="App">
      <span>{isEven}</span>
      <button onClick={incrementCounterOne}>Counter 1 - {counterOne}</button>
      <button onClick={incrementCounterTwo}>Counter 1 - {counterTwo}</button>
    </div>
  );
}

export default App;
