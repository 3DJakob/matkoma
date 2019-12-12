import React from 'react'
import Button from '../components/Button'

const divStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

function NoResults ({ onClick }) {
  return (
    <div style={divStyle}>
      <p>
        Inga fler recept :(
      </p>
      <p>
        Uppdatera din sökning och försök igen.
      </p>
      <Button text='Ny sökning' onClick={onClick} />

    </div>
  )
}

export default NoResults
