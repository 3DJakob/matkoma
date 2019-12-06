import React from 'react'

function Button ({ text, upperCase = true, onClick, style }) {
  Button.defaultProps = {
    upperCase: false
  }

  const buttonStyle = {
    backgroundColor: '#6FC48C',
    boxShadow: '0px 0px 20px 1px rgba(0,0,0,0.2)',
    color: '#ffffff',
    fontFamily: 'Lato, sans-serif',
    fontSize: 20,
    fontWeight: 'bold',
    border: 'none',
    padding: '12px 22px',
    margin: 5,
    borderRadius: 100,
    textTransform: upperCase ? 'upperCase' : 'initial'
  }

  return (
    <button onClick={onClick} type='button' style={Object.assign(buttonStyle, style)}>{text}</button>
  )
}

export default Button
