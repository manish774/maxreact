import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers]=useState([])

  

  const getData = async () =>{
    try{
      const callService = await fetch('https://api.github.com/users')
      const data = await callService.json();
      setUsers(data)
    }catch(e){
      console.log(e.message)
    }   
  }

  useEffect(() => {
    getData()
    
  }, []);


  const debounceData = (skipTime,callback) =>{
    let timer
    return function(){
      clearTimeout(timer)
      timer = setTimeout(()=>{
        console.log("manish")
      },skipTime)
    }
  }
  const debounce = debounceData(300,getData)
  const usersList = users.map(user=><li key={user.login}>{user.login}</li>)
  return (
    <div className="App">
      <ul>{usersList}</ul>
      <input onInput={debounce}/>
    </div>
  );
}

export default App;
