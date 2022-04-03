import React,{useContext} from 'react'
import userContext from './user-context';
import classes from './Child.module.css'

const Child = () => {
  const userCtx =   useContext(userContext);

  console.log(userCtx,"userCtx")

  const userList = userCtx.users.users.map((user) => (
    <li key={user.id} className={classes.color}>{user.name}</li>
  ));
  return (
    <>
      <ul>{userList}</ul>
    </>
  );
}

export default Child