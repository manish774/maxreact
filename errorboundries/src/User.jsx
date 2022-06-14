import React from 'react'

const User = props => {
    if(props.name==="ABC" || props.name==="BCD"){
        throw new Error(`${props.name} is out of scope`)
    }
  return (
    <div>{props.name}</div>
  )
}

export default User;