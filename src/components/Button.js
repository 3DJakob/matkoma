import React from 'react'


function Button ({text, onClick}) {

    const buttonStyle = {
        backgroundColor: '#ce4257',
        color: '#ffffff',
        fontFamily: '"Bree", sans-serif',
        fontSize: '20px',
        fontWeight: 'regular',
        border: 'none',
        padding: '15px',
        margin: '5px',
        borderRadius: '100px'
    }

    return (
        <button onClick={onClick} type="button" style={buttonStyle}>{text}</button>
    )

}

export default Button