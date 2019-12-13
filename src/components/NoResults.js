import React from 'react'
import Button from '../components/Button'

const divStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const pStyle = {
  marginTop: 0
}

function NoResults ({ onClick }) {
  return (
    <div style={divStyle}>
      <h1>
        Inga fler recept :(
      </h1>
      <p style={pStyle}>
        Uppdatera din sökning och försök igen.
      </p>
      <Button text='Ny sökning' onClick={onClick} />

    </div>
  )
}

export default NoResults
