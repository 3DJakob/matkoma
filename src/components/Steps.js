import React, { useState } from 'react'
import Checkbox from './Checkbox'
import '../css/global.css'
import Timer from './Timer'

const uuid = require('uuid/v4')
function StepsList ({ recipe }) {
  const stepsWithTimerWithIds = recipe.steps.map(step => {
    step.timersWithId = step.timers.map(timer => {
      return {
        id: uuid(),
        // timer: timer,
        totalTime: timer * 60 * 1000,
        timeLeft: timer * 60 * 1000,
        isRunning: false,
        startTime: null
      }
    })
    return step
  })

  return (
    <div>
      <h2 style={{ textAlign: 'left' }}>Gör så här</h2>
      {stepsWithTimerWithIds.map((s) => <Step step={s} key={uuid()} />)}
    </div>
  )
}

function Step ({ step }) {
  const [timerState, setTimerState] = useState(step.timersWithId)
  const [hasMounted, setHasMounted] = useState(false)

  const toggleTimer = (id) => {
    const newState = timerState.filter(timer => timer.id !== id)
    const matchedTimer = timerState.filter(timer => timer.id === id)[0]
    matchedTimer.isRunning = !matchedTimer.isRunning
    if (matchedTimer.isRunning) {
      matchedTimer.startTime = new Date().getTime()
    } else {
      if (matchedTimer.timeLeft <= 0) {
        window.alert('Håll i hatten, timern är klar!')
      }
      matchedTimer.startTime = null
      matchedTimer.timeLeft = matchedTimer.totalTime
    }
    newState.push(matchedTimer)
    setTimerState(newState)
  }

  const updateTimers = () => {
    const newState = timerState.map(timer => {
      const obj = timer
      if (obj.isRunning) {
        obj.timeLeft = (obj.totalTime - (new Date().getTime() - obj.startTime))
        if (obj.timeLeft < 0) {
          toggleTimer(obj.id)
        }
      }
      return obj
    })
    setTimerState(newState)
  }
  if (!hasMounted) {
    setInterval(updateTimers, 1000)
    setHasMounted(true)
  }
  return (
    <div>
      <Checkbox label={step.step} topMargin='7px' onPress={() => {}} />
      {step.timersWithId.map(t => <Timer totalTime={t.totalTime} onClick={() => toggleTimer(t.id)} isRunning={t.isRunning} timeLeft={t.timeLeft} key={uuid()} />)}
    </div>
  )
}

export default StepsList
