import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchButton ({ func }) {
  const buttonStyle = {
    position: 'absolute',
    top: 12,
    left: 13,
    width: 30,
    height: 30,
    borderRadius: '50%',
    boxShadow: '0 0 10px 1px #0000007a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 20
  }
  return (
    <div onClick={func} style={buttonStyle}>
      <FontAwesomeIcon icon={faSearch} color='#6fc48c' />
    </div>

  )
}

export default SearchButton
