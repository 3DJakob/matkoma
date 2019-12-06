import React from 'react'
import { getTextColorFromDifficulty } from '../lib/utils'
import IngredientList from './Ingredient'
import '../css/global.css'
import arrowLogo from '../img/arrow.svg'
import StepsList from './Steps'

function Description ({ style = {}, recipe, onClick }) {
  const height = 100

  const DescriptionWrapper = {
    position: 'relative',
    margin: '-80px 0 0 0',
    width: '100vw'
  }

  const EllipsWrapper = {
    width: '100vw',
    overflow: 'hidden',
    position: 'absolute',
    top: -height / 2,
    zIndex: -5
  }

  const Ellips = {
    width: '150vw',
    height: height * 1.5,
    transform: 'translateX(-25vw)',
    backgroundColor: '#fff',
    borderRadius: '50% 50% 0 0'
  }

  const DescriptionContainerStyle = {
    textAlign: 'center',
    backgroundColor: '#fff'
  }

  const CookingHatsContainerStyle = {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center'
    // margin: '10px 0 0 0',
    // position: 'absolute',
    // left: 0,
    // top: -height / 2
  }

  const HeaderContainerStyle = {
    whiteSpace: 'nowrap',
    fontSize: '0.8em',
    width: '85%',
    margin: '0 auto'
  }

  const TextStyle = {
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#000000'
  }

  const sumaryDescriptionStyle = {
    whiteSpace: 'initial',
    textAlign: 'left'
  }
  const iconStyleContainer = {
    position: 'absolute',
    top: -height / 2,
    width: '100vw',
    margin: '15px 0px 0px 0px'
  }
  const arrowIconStyle = {
    width: 40,
    opacity: 0.5
  }
  return (
    <div style={{ ...style, ...DescriptionWrapper }}>
      <div style={EllipsWrapper}>
        <div style={Ellips}> </div>
      </div>
      <div style={DescriptionContainerStyle}>
        <div style={iconStyleContainer}>
          <img src={arrowLogo} alt='' style={arrowIconStyle} />
        </div>

        <div style={CookingHatsContainerStyle}>
          {CookingHats(recipe.difficulty)}
        </div>

        <div style={HeaderContainerStyle}>
          <h1 className='heading' style={TextStyle}>
            {recipe.title}
          </h1>
          <h2 className='subheading' style={TextStyle}>
            {recipe.cookingTime} min
          </h2>
          <p className='bodytext' style={sumaryDescriptionStyle}>
            {recipe.description}
          </p>
          <div>
            <IngredientList recipe={recipe} />
          </div>
          <div>
            <StepsList recipe={recipe} />
          </div>
        </div>

      </div>
    </div>
  )
}

function CookingHats (difficulty) {
  let bools = []
  switch (difficulty) {
    case 'Enkel':
      bools = [true, false, false]
      break
    case 'Medel':
      bools = [true, true, false]
      break
    case 'Avancerad':
      bools = [true, true, true]
      break
    default :
      bools = [false, false, false]
  }
  return (
    bools.map((bool, index) =>
      <CookingHat key={index} isFilled={bool} color={getTextColorFromDifficulty(difficulty)} />)
  )
}

function CookingHat ({ isFilled, color }) {
  const style = {
    opacity: isFilled ? 1.0 : 0.6
  }
  color = isFilled ? color : '#ababab'
  return (
    <div style={style}>
      <svg height='26' viewBox='0 0 29.586 26' width='29.586' xmlns='http://www.w3.org/2000/svg'><path d='m6.379 16.224a5.828 5.828 0 1 1 2.689-11.191 7.624 7.624 0 0 1 13.45 0 5.828 5.828 0 1 1 2.689 11.192v5.4h-18.828zm0 7.189h18.828v1.587a2 2 0 0 1 -2 2h-14.828a2 2 0 0 1 -2-2z' fill={color} fillRule='evenodd' transform='translate(-1 -1)' /></svg>
    </div>

  )
}

export default Description
