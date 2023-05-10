import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers]=useState([])

  

  const getData = async (obj) =>{
    try{
      const callService = await fetch(obj.url)
      const data = await callService.json();
     // setUsers(data)
     obj.callback();
    }catch(e){
      console.log(e.message)
    }   
  };
  const userss = () =>{
    console.log("abc")
  }

  const carts = () =>{
    console.log("cart")
  }

  useEffect(() => {
    let obj = {
      url: 'https://api.github.com/users',
      callback: userss
    }

    if(true){
      obj = {
        url: 'https://api.github.com/users',
        callback: carts
      }
    }
    
    obj = {
      url: 'https://api.github.com/users/1',
      callback: carts
    }

    getData(obj)
    
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
  console.log(usersList)
  return (
    <div className="App">
      <ul>{usersList}</ul>
      <input onInput={debounce}/>
    </div>
  );
}

export default App;
