import React from 'react'
import Button from '../components/Button'

function Timer ({ totalTime, timeLeft, isRunning, onClick }) {
  const barHeight = 10
  const barWidth = isRunning ? (timeLeft * 100 / totalTime) + '%' : 0

  const borderRadius = 6
  const buttonText = isRunning ? 'Avsluta timer' : 'Starta timer'

  const currentTimeLeft = new Date(timeLeft)

  const offsetHours = currentTimeLeft.getTimezoneOffset() / 60

  const hoursLeft = currentTimeLeft.getHours() + offsetHours
  const minutesLeft = currentTimeLeft.getMinutes()
  const secondsLeft = currentTimeLeft.getSeconds()

  const barContainerStyle = {
    position: 'relative'
  }
  // style på bakgrunden
  const barBackgroundStyle = {
    width: '100%',
    height: barHeight,
    backgroundColor: '#C8C8C8',
    borderRadius: borderRadius
  }
  // style på bar som minskar
  const barStyle = {
    width: barWidth,
    height: barHeight,
    backgroundColor: '#6FC48C',
    borderRadius: borderRadius,
    position: 'absolute',
    top: 0,
    transition: 'linear 1000ms'
  }

  const buttonStyle = {
    fontSize: 15,
    height: 40,
    width: 140,
    padding: 0,
    margin: '10px 0',
    backgroundColor: isRunning ? '#CF4257' : '#6FC48C',
    transition: '200ms'
  }

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
  const timeStyle = {
    alignSelf: 'flex-end',
    color: '#4E4E4E',
    fontFamily: 'Lato, sans-serif',
    fontSize: 20,
    fontWeight: 'bold',
    margin: '10px 0'
  }

  return (
    <div style={{ marginLeft: 35 }}>
      <div style={buttonContainerStyle}>
        <Button text={buttonText} onClick={onClick} style={buttonStyle} />
        <p style={timeStyle}>{hoursLeft === 0 ? '' : ('0' + hoursLeft).slice(-2) + ':'}{('0' + minutesLeft).slice(-2)}:{('0' + secondsLeft).slice(-2)}</p>
      </div>
      <div style={barContainerStyle}>
        <div style={barBackgroundStyle} />
        <div style={barStyle} />
      </div>
    </div>
  )
}

export default Timer
