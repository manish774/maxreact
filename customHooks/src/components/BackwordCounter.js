import React from 'react'
import useCounter from '../Hooks/use-counter'
const BackwordCounter = () => {
    const counter = useCounter("dec");
  return (
    <div>{counter}</div>
  )
}

export default BackwordCounter