import React from 'react'

const userContext = React.createContext({
    users: 0,
    updateUser: ()=>{}
});

export default userContext;