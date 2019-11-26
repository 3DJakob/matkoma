import React from 'react'
import LogoBanner from '../components/LogoBanner'
import TitleWithDescription from '../components/TitleWithDescription'
import SearchList from '../components/SearchList'
import recepies from '../db/recepies'
import getIngredientsFromRecepies from '../lib/utils'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import StyledSlider from '../components/StyledSlider'

function Preferences () {
  const ingredients = getIngredientsFromRecepies(recepies)
  const onSelectedIngredient = (ingredient) => {
    console.log(ingredient)
  }

  return (
    <div className='Preferences'>
      <LogoBanner />
      <TitleWithDescription title='1. Lägg till ingredienser' description='Ange upp till tre ingredienser som du vill använda' />
      <SearchList placeholder='Skriv in en ingrediens...' numberOfVisibleInResult={5} list={ingredients} onClick={onSelectedIngredient} />
      <TitleWithDescription title='2. Ange (mål)tid' description='Hur mycket tid har du?' />
      <StyledSlider onChange={() => console.log('Slidern slidedad')} />
      <TitleWithDescription title='3. Ange matpreferens' description='Har du någon specialkost?' />
      <Checkbox label='Vegetariskt' />
      <Checkbox label='Glutenfri' />
      <Checkbox label='Laktosfri' />
      <Checkbox label='Äggfri' />
      <Checkbox label='Vegan' />
      <Checkbox label='Nötfri' />
      <Button text='Hitta match' upperCase onClick={() => ('Sökknappen klickt')} />

    </div>
  )
}

export default Preferences
