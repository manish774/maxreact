import React, { useContext } from "react";
import userContext from "./context/user-context";
const Users = () => {
  const userCtx = useContext(userContext);
  console.log(userCtx);
  const userList = userCtx.users.users.map((user) => (
    <li key={user.id}>{user.name}</li>
  ));
  return (
    <>
      <ul>{userList}</ul>
      <button onClick={userCtx.updateUser}>Add User</button>
    </>
  );
};

export default Users;
