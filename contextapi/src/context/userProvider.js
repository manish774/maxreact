import React, { useReducer } from "react";
import userContext from "./user-context";
const defaultValues = {
  users: [{ name: "maniah", id: 1 }],
};
const reducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      ...state,
      users: [
        ...state.users,
        {
          name: (Math.random() + 1).toString(36).substring(7),
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ],
    };
  }
  return defaultValues;
};
const UserProvider = (props) => {
  const [state, dispatecMethod] = useReducer(reducer, defaultValues);

  const updateUser = (props) => {
    dispatecMethod({ type: "ADD" });
  };
  const usrContext = {
    users: state,
    updateUser,
  };

  return (
    <userContext.Provider value={usrContext}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserProvider;
