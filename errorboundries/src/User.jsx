import React from 'react'

const User = props => {
    if(props.name==="ABC"){
        throw new Error("Somthing went wrong...")
    }
  return (
    <div>{props.name}</div>
  )
}

export default User;