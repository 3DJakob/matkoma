import React, { useState } from 'react'
import '../css/Ingredient.css'
import '../css/global.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const uuid = require('uuid/v4')
const selectOptions = [1, 2, 3, 4, 6, 8, 10]
const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start'
}
const upperRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  position: 'relative'
}
const iconStyle = {
  position: 'absolute',
  right: 13
}
function IngredientList ({ recipe }) {
  const [selectedNumberOfPortions, setSelectedNumberOfPortions] = useState(recipe.numberOfPortions)

  const onNewPortion = function (event) {
    setSelectedNumberOfPortions(event.target.value)
  }
  return (
    <div style={wrapperStyle}>
      <div style={upperRowStyle}>
        <h2 className='heading'>Ingredienser</h2>
        <select className='selectStyle' onChange={onNewPortion} value={selectedNumberOfPortions}>
          {selectOptions.map(option => <option value={option} key={option}>{option} portioner</option>)}
        </select>
        <FontAwesomeIcon style={iconStyle} icon={faChevronDown} />
      </div>
      {recipe.ingredients.map(i => <Ingredient key={uuid()} ingredient={i} multiplier={selectedNumberOfPortions / recipe.numberOfPortions} />)}
    </div>
  )
}

function Ingredient ({ ingredient, multiplier }) {
  return (
    <div className='bodytext'>
      {ingredient.comment} {ingredient.amount ? ingredient.amount * multiplier : ''} {ingredient.unit} {ingredient.name}
    </div>
  )
}
export default IngredientList
