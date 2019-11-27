import React from 'react'
import logo from '../img/logo.svg'

const LogoBanner = function () {
  const height = 100

  const parentStyle = {
    width: '100vw',
    height: height
  }

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgb(116, 244, 151)',
    background: 'linear-gradient(0deg, rgba(111,196,140,1) 0%, rgba(116,244,151,1) 50%)',
    borderRadius: '0 0 50% 50%',
    height: height * 2,
    width: '160vw',
    transform: 'translateY(' + -height + 'px) translateX(-30vw)',
    boxShadow: 'inset 0 0 100px 0 rgba(0,0,0,0.2)'
  }

  const logoStyle = {
    width: height * 0.7,
    height: height * 0.7,
    marginBottom: height * 0.1
  }

  return (
    <div style={parentStyle}>
      <div style={containerStyle}>
        <img style={logoStyle} src={logo} alt='logo' />
      </div>
    </div>
  )
}

export default LogoBanner
