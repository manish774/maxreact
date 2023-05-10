import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [obj,setObj]  = useState({data:{}});
  const [name,setName] = useState();
  useEffect(()=>{
    fetch('https://api.github.com/users/1').then((res)=>{
      return res.json()
    }).then(res=>setObj((r=>({r,data:res}))));
    
  },[name]);

  const newArr = Object.keys(obj.data).map((m)=><p key={m}>{m}</p>)
  return (
    <div className="Ap">
      {newArr}
    </div>
  );
}

export default App;
