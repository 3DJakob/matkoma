import React from 'react'
import Checkbox from './Checkbox'
import '../css/global.css'

const uuid = require('uuid/v4')
function StepsList ({ recipe }) {
  return (
    <div>
      <h2 style={{ textAlign: 'left' }}>Gör så här</h2>
      {recipe.steps.map((s) => <Step step={s} key={uuid()} />)}
    </div>
  )
}

function Step ({ step }) {
  return (
    <div>
      <Checkbox label={step.step} topMargin='7px' onPress={() => {}} />
    </div>
  )
}

export default StepsList
