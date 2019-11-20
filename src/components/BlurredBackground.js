import React from 'react'

function BlurredBackground ({ backgroundURL }) {
  const bgStyle = {
    backgroundImage: 'url(' + backgroundURL + ')',
    position: 'absolute',
    top: -10,
    bottom: -10,
    right: -10,
    left: -10,
    backgroundSize: 'cover',
    filter: 'blur(10px)',
    backgroundPosition: 'center',
    zIndex: -10,
    transitionProperty: 'background',
    transitionDuration: '0.25s'
  }

  return (
    <div style={bgStyle} />
  )
}

export default BlurredBackground
