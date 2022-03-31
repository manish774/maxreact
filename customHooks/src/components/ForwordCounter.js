import React from 'react'
import useCounter from '../Hooks/use-counter'
const ForwordCounter = () => {
    const counter = useCounter("inc");
  return (
    <div>{counter}</div>
  )
}

export default ForwordCounter