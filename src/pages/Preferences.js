import React, { useState } from 'react'
import '../css/Preferences.css'
import LogoBanner from '../components/LogoBanner'
import TitleWithDescription from '../components/TitleWithDescription'
import SearchList from '../components/SearchList'
import { getIngredientsFromRecepies, getSpecialDietsFromRecepies } from '../lib/utils'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import StyledSlider from '../components/StyledSlider'
import Tag from '../components/Tag'

const uuid = require('uuid/v4')

const sliderInitialValues = [0, 60]

function Preferences ({ recepies }) {
  const [userData, setUserData] = useState({ tags: [], minTime: sliderInitialValues[0], maxTime: sliderInitialValues[1], specialDiets: [] })

  const ingredients = getIngredientsFromRecepies(recepies)
  const specialDiets = getSpecialDietsFromRecepies(recepies)

  const onSelectedIngredient = ingredient => {
    const tags = Array.from(new Set([...userData.tags, ingredient]))
    setUserData({ ...userData, tags })
  }

  const toggleDiet = (bool, inDiet) => {
    const newState = userData
    if (bool) {
      newState.specialDiets.push(inDiet)
      setUserData({ })
    } else {
      newState.specialDiets = newState.specialDiets.filter(diet => inDiet !== diet)
    }
    setUserData(newState)
  }

  const onSliderChange = (data) => {
    const newState = userData
    newState.minTime = data[0]
    newState.maxTime = data[1]
    setUserData(newState)
  }

  const removeIngridient = (name) => {
    const tags = Array.from(userData.tags.filter(tag => tag !== name))
    setUserData({ ...userData, tags })
  }

  const search = () => {
    console.log(userData) // To implement search database
  }

  return (
    <div className='Preferences'>
      <LogoBanner />
      <div className='topBg' />
      <div className='preferencesContainer'>
        <TitleWithDescription title='Lägg till ingredienser' description='Ange upp till tre ingredienser som du vill använda' />
        <SearchList placeholder='Skriv in en ingrediens...' numberOfVisibleInResult={5} list={ingredients} onClick={onSelectedIngredient} />
        <div className='tagContainer'>
          {userData.tags.map((name) => <Tag key={uuid()} text={name} onClick={() => removeIngridient(name)} />)}
        </div>
        <TitleWithDescription title='Ange tid' description='Hur mycket tid har du?' />
        <StyledSlider onChange={onSliderChange} initialValues={sliderInitialValues} />
        <TitleWithDescription title='Ange matpreferens' description='Har du någon specialkost?' />
        <div className='dietContainer'>
          {specialDiets.map((diet) => <Checkbox style={{ width: '50%' }} key={diet} label={diet} onPress={(state) => toggleDiet(state, diet)} />)}
        </div>
        <div className='bottomContainer'>
          <Button text='Hitta match' onClick={search} />
        </div>
      </div>
    </div>
  )
}

export default Preferences
