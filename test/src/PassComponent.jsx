import React from 'react'
import Childrens from './Childrens'

const PassComponent = () => {
    return (
        <div><Childrens ch={child} /></div>
    )
}

const child = () => {
    const play = () => {
        console.log("first")
    }
    return (
        <div onClick={play}>child</div>
    )
}

export default PassComponent