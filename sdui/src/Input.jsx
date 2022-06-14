import React from 'react'

const Input = (prpos) => {
    
    const inputElements = prpos.DUMMY_DATA.map((inp) => {
    
        return React.createElement('input', { onInput: [inp.ev.name][inp.ev],"id":"hello"})
        // return <input type={inp.elmType} name={inp.name} className={inp.class.join(" ")} {...inp.attribute} />
    })
    return (
        <div>{inputElements}</div>
    )
}

export default Input