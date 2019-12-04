import React from 'react'

function Card ({ recipe, showfront = true, onClick }) {
  const CardStyle = {
    height: '50vh',
    width: '80vw',
    position: 'relative',
    transition: 'transform 2s',
    transformStyle: 'preserve-3d',
    transform: showfront ? 'rotateY(180deg)' : 'rotateY(0deg)'
  }

  const FrontStyle = {
    backgroundImage: recipe.imageURL,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    boxShadow: '0px 0px 20px 1px #0000006e',
    height: '100%',
    width: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    borderRadius: 20
  }

  const BackStyle = {
    background: 'red',
    height: '100%',
    width: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: 20
  }

  return (
    <div style={CardStyle}>
      <div style={FrontStyle} />
      <div style={BackStyle} />
    </div>
  )
}

export default Card
