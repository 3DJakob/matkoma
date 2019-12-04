import React from 'react'
import { getTextColorFromDifficulty } from '../lib/utils'
import IngredientList from './Ingredient'
import '../css/global.css'

function Description ({ style = {}, recipe, onClick }) {
  const height = 100

  const DescriptionWrapper = {
    position: 'relative',
    margin: height + 'px 0 0 0',
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
    height: height,
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
    justifyContent: 'center',
    margin: '10px 0 0 0',
    position: 'absolute',
    left: 0,
    top: -height / 2
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

  return (
    <div style={{ ...style, ...DescriptionWrapper }}>
      <div style={EllipsWrapper}>
        <div style={Ellips}> </div>
      </div>
      <div style={DescriptionContainerStyle}>
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
    width: 25,
    height: 25,
    opacity: isFilled ? 1.0 : 0.6
  }
  color = isFilled ? color : '#ababab'
  return (
    <div style={style}>
      <svg clipRule='evenodd' fillRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2' viewBox='0 0 554 511' xmlns='http://www.w3.org/2000/svg'><g fill={color}><path d='m432.027 337.853h-328.65v98.74c0 9.9 3.933 19.395 10.933 26.396 7.001 7.001 16.496 10.934 26.397 10.934h253.991c9.9 0 19.395-3.933 26.396-10.934s10.933-16.496 10.933-26.396z' transform='translate(7.85709 5.48232)' /><path d='m159.002 310.819h-46.327l-45.146-128.635c-1.53-6.336-9.181-24.534-9.181-38.012 0-45.931 37.29-83.221 83.22-83.221 17.583 0 33.9 5.465 47.343 14.787 18.07-29.741 50.776-49.625 88.089-49.625 37.914 0 71.072 20.53 88.951 51.071 13.813-10.201 30.889-16.233 49.362-16.233 45.931 0 83.221 37.29 83.221 83.221 0 13.478-4.949 25.683-9.181 38.012-9.531 27.762-47.993 128.545-48.028 128.635h-46.327v-152.313c-.027-.837-.014-1.049-.119-1.88-.675-5.344-4.398-10.103-9.359-12.067-1.233-.488-1.697-.751-4.58-1.024-.582-.018-1.014-.139-2.822.089-5.642.713-10.64 4.872-12.386 10.247-.41 1.26-.643 1.74-.734 4.635v152.313h-72.998v-176.637c-.201-5.883-3.716-11.453-9.024-13.758-1.322-.575-1.821-.885-4.952-1.207-.633-.022-1.108-.165-3.066.104-5.457.75-10.262 4.688-12.092 9.837-.482 1.358-.759 1.878-.866 5.024v176.637h-72.998v-152.313c-.026-.837-.013-1.049-.118-1.88-.675-5.344-4.399-10.103-9.36-12.067-1.232-.488-1.696-.751-4.58-1.024-.581-.018-1.014-.139-2.822.089-5.343.675-10.102 4.399-12.066 9.36-.636 1.605-.957 2.446-1.054 5.522z' transform='translate(-1.4408 5.48232)' /></g></svg>
    </div>

  )
}

export default Description
