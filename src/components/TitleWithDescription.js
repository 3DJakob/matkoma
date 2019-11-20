import React from 'react'

function TitleWithDescription ({ title, description }) {
  const divStyle = {
    paddingLeft: 5
  }

  const titleStyle = {
    color: '#000000',
    fontFamily: 'Roboto Slab, sans-serif',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 0
  }

  const descriptionStyle = {
    color: '#4E4E4E',
    fontFamily: 'Lato, sans-serif',
    fontSize: 15,
    marginTop: 0
  }

  return (
    <div style={divStyle}>
      <h1 style={titleStyle}>{title}</h1>
      <p style={descriptionStyle}>{description}</p>
    </div>
  )
}

export default TitleWithDescription
