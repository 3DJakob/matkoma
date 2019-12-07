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

/**
 * @typedef {Object} userData
 * @property {[String]} tags
 * @property {Number} minTime
 * @property {Number} maxTime
 * @property {[String]} specialDiets
 */

/**
 * The initial valiue for the coockingtime slider
 */
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

  /**
   * Fired when a ingredient is clicked.
   * @param {ingredient} ingredient
   */
  const onSelectedIngredient = ingredient => {
    const tags = Array.from(new Set([...userData.tags, ingredient]))
    setUserData({ ...userData, tags })
  }

  /**
   * Fired when a special diet gets pressed.
   * @param {Boolean} bool
   * @param {String} inDiet
   */
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

  /**
   * Fired when the slider gets changed
   * @param {[Number, Number]} values
   */
  const onSliderChange = (values) => {
    const newState = userData
    newState.minTime = values[0]
    newState.maxTime = values[1]
    setUserData(newState)
  }

  /**
   * Removes an ingredeient from the userData
   * @param {String} name
   */
  const removeIngredient = (name) => {
    const tags = Array.from(userData.tags.filter(tag => tag !== name))
    setUserData({ ...userData, tags })
  }

  /**
   * Filters the recepies with the userData and sends it back to the app page
   */
  const filterResultsAndSend = async () => {
    /**
     * Checks if recepie has the specialDiets
     * @param {[String]} userDiets
     * @param {[String]} recepieDiets
     */
    const checkSpecialDiets = (userDiets, recepieDiets) => {
      return array1ContainsArray2(recepieDiets, userDiets)
    }

    /**
     * Checks if recepie has the ingredients in tags.
     * @param {[ingredient]} recepieIngredients
     * @param {[String]} tags
     */
    const checkTags = (recepieIngredients, tags) => {
      const ingredients = recepieIngredients.map((ingredient) => ingredient.name)
      return array1ContainsArray2(ingredients, tags)
    }

    /**
     * Checks if recepie is within the desired cooking range.
     * @param {Number} cookingTime
     * @param {Number} max
     * @param {Number} min
     */
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
          {userData.tags.map((name) => <Tag key={uuid()} text={name} onClick={() => removeIngredient(name)} />)}
        </div>
        <TitleWithDescription title='Ange tid' description='Hur mycket tid har du?' />
        <StyledSlider onChange={onSliderChange} initialValues={sliderInitialValues} />
        <TitleWithDescription title='Ange matpreferens' description='Har du någon specialkost?' />
        <div className='dietContainer'>
          {specialDiets.map((diet) => <Checkbox style={{ width: '50%' }} key={diet} label={diet} onPress={(state) => toggleDiet(state, diet)} />)}
        </div>
        <div className='bottomContainer'>
          <Button text='Hitta match' onClick={filterResultsAndSend} />
        </div>
      </div>
    </div>
  )
}

export default Preferences
