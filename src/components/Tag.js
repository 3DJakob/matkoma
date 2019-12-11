import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '../css/animations.css'

function Tag ({ text, onClick }) {
  const tagStyle = {
    backgroundColor: '#6FC48C',
    color: '#ffffff',
    fontFamily: 'Lato, sans-serif',
    fontSize: 12,
    fontWeight: 'regular',
    border: 'none',
    padding: 10,
    margin: '0 10px 10px 0',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    animationName: 'bounceIn',
    animationDuration: '0.5s'
  }

  const iconStyle = {
    color: '#fff',
    padding: 2,
    marginLeft: 5
  }

  return (
    <button type='button' style={tagStyle}>
      {text}
      <FontAwesomeIcon onClick={onClick} style={iconStyle} icon={faTimes} />
    </button>
  )
}

export default Tag
