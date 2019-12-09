import React, { useState, useEffect, useRef } from 'react'
import '../css/Swipe.css'
import Card from '../components/Card'
import Description from '../components/Description'
import BlurredBackground from '../components/BlurredBackground'
import Banner from '../img/receptmatch.svg'
import TinderCard from 'react-tinder-card'

const cardsToShowAtTheTime = 4

function Swipe ({ recepies }) {
  const buttonRef = useRef(null)
  const [amountOfCardsToShow, setAmountOfCardsToShow] = useState(recepies.length - cardsToShowAtTheTime)
  const [currentRecipe, setCurrentRecipe] = useState(recepies[recepies.length - 1])

  useEffect(() => {
    document.title = `You clicked ${amountOfCardsToShow} times`
  })

  const [cardShowFront, setCardShowFront] = useState(false)
  const cardSwiped = (dir) => {
    setCurrentRecipe(recipes[counter])
    toggleFront()
  }

  const increase = () => {
    setAmountOfCardsToShow(amountOfCardsToShow - 1)
    setCurrentRecipe(recepies[amountOfCardsToShow + cardsToShowAtTheTime - 2])
    if (amountOfCardsToShow - 1 === -cardsToShowAtTheTime) {
      console.log('all recepies swiped!')
    }
  }

  const hiddenStyle = {
    display: 'none'
  }

  return (
    <div className='swipe'>
      <button ref={buttonRef} style={hiddenStyle} onClick={increase}>increase!</button>
      <img className='banner' src={Banner} alt='' />
      <BlurredBackground backgroundURL={currentRecipe.imageURL} height='90vh' />
      <div className='swipeArea'>
        <div className='CardContainer'>
          {recepies.map((recepie, index) =>
            <TinderCard key={recepie.id} className={index > amountOfCardsToShow ? 'tinderCard' : 'tinderCard hidden'} onSwipe={cardSwiped} onCardLeftScreen={() => console.log('left sceen')}>
              <Card key={recepie.id + 'card'} recipe={recepie} />
            </TinderCard>
          )}
        </div>
      </div>
      <Description style={{ zIndex: 15 }} recipe={currentRecipe} />
    </div>

  )
}

export default Swipe
