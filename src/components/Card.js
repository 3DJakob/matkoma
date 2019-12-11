import React from 'react'
import '../css/animations.css'

function Card ({ recipe, showfront = true, onClick }) {
  const CardStyle = {
    height: '100%',
    width: '80vw',
    position: 'relative',
    transition: 'transform 2s',
    transformStyle: 'preserve-3d',
    animation: showfront ? 'flip 500ms forwards' : ''
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
    backgroundColor: '#c6e1cf',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%2357a773\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
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
