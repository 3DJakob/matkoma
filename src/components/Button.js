import React from 'react'

function Button ({ text, upperCase, onClick, style }) {
  Button.defaultProps = {
    upperCase: false
  }

  const buttonStyle = {
    backgroundColor: '#6FC48C',
    color: '#ffffff',
    fontFamily: 'Lato, sans-serif',
    fontSize: 20,
    fontWeight: 'bold',
    border: 'none',
    padding: 15,
    margin: 5,
    borderRadius: 100,
    textTransform: upperCase ? 'upperCase' : 'initial'
  }

  return (
    <button onClick={onClick} type='button' style={Object.assign(buttonStyle, style)}>{text}</button>
  )
}

export default Button
