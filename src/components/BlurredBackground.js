import React from 'react'

function BlurredBackground ({ backgroundURL, height }) {
  const bgStyle = {
    backgroundImage: backgroundURL,
    height: height,
    transform: 'scale(1.1)',
    backgroundSize: 'cover',
    filter: 'blur(10px)',
    backgroundPosition: 'center',
    transitionProperty: 'background',
    transitionDuration: '0.25s'
  }
  const wrapperStyle = {
    width: '100vw',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }

  return (
    <div style={wrapperStyle}>
      <div style={bgStyle} />
    </div>
  )
}

export default BlurredBackground
