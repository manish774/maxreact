import React from 'react'

const Audiocontrol = (props) => {
    return (
        <>
            <audio controls>
                <source src={props.src} type="audio/ogg" />
                <source src={props.src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </>
    )
}

export default Audiocontrol