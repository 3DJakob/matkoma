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

/**
 * Check if the first array completely eclipses array 2.
 * @param {[String]} arr1
 * @param {[String]} arr2
 */
const array1ContainsArray2 = (arr1, arr2) => {
  if (arr2.length === 0) { return true }
  const inCommon = arr2.filter((arr2Item) => arr1.includes(arr2Item))
  if (arr2.length === inCommon.length) { return true }
  return false
}

/**
 * Preferences page
 * @param {[recepie]} recepies - an array of recepies
 */
function Preferences ({ recepies, onRecepieResult }) {
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

  const search = async () => {
    const checkSpecialDiets = (userDiets, recepieDiets) => {
      return array1ContainsArray2(recepieDiets, userDiets)
    }

    const checkTags = (recepieIngredients, tags) => {
      const ingredients = recepieIngredients.map((ingredient) => ingredient.name)
      return array1ContainsArray2(ingredients, tags)
    }

    const checkTime = (cookingTime, max, min) => {
      if (min <= cookingTime && cookingTime <= max) {
        return true
      }
      return false
    }

    const resultingRecepies = recepies.filter((recepie) =>
      checkTime(recepie.cookingTime, userData.maxTime, userData.minTime) && // This filter runs fastest!
      checkTags(recepie.ingredients, userData.tags) &&
      checkSpecialDiets(userData.specialDiets, recepie.specialDiets)
    )

    // console.log('result is: ')
    // console.log(resultingRecepies)
    onRecepieResult(resultingRecepies)
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
