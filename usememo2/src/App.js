import logo from './logo.svg';
import './App.css';
import { useMemo, useState } from 'react';

function App() {
  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  const incrementCounterOne = () => {
      setCounterOne(counterOne + 1);
  }
  const incrementCounterTwo = () => {
    setCounterTwo(counterTwo + 1);
  }
  const isEven = useMemo(() => {
    let i = 0;
    while (i < 2000000000) {
      i++;
    }
    return counterOne % 2 === 0;
  },[counterOne])
  return (
    <div className="App">
      <span>{isEven}</span>
      <button onClick={incrementCounterOne}>Counter 1 - {counterOne}</button>
      <button onClick={incrementCounterTwo}>Counter 2 - {counterTwo}</button>
    </div>
  );
}

export default App;
