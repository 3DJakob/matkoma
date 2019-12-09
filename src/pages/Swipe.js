import React, { useState, useEffect, useRef } from 'react'
import '../css/Swipe.css'
import Card from '../components/Card'
import Description from '../components/Description'
import BlurredBackground from '../components/BlurredBackground'
import Banner from '../img/receptmatch.svg'
import TinderCard from 'react-tinder-card'
import { CSSTransition } from 'react-transition-group'
import * as Scroll from 'react-scroll'

const cardsToShowAtTheTime = 4
function Swipe ({ recepies }) {
  const buttonRef = useRef(null)
  const scaleRef = useRef(null)
  const [amountOfCardsToShow, setAmountOfCardsToShow] = useState(recepies.length - cardsToShowAtTheTime)
  const [currentRecipe, setCurrentRecipe] = useState(recepies[recepies.length - 1])
  const [showDescription, setShowDescription] = useState(false)

  const [showingRecipe, setShowingRecipe] = useState(false)
  useEffect(() => {
    setShowDescription(true)
    // document.title = `You clicked ${amountOfCardsToShow} times`
    document.title = currentRecipe.title
  })

  const cardSwiped = (dir) => {
    setShowDescription(false)
    buttonRef.current.click()
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

  const scaleStyle = {
    position: 'absolute'
  }

  const getScrollInDecimal = () => {
    return (window.scrollY / (document.documentElement.clientHeight - 150))
  }

  const onScroll = (e) => {
    const res = Math.max(Math.min(1 + getScrollInDecimal(), 1.25), 1)
    scaleRef.current.style.transform = 'scale(' + res + ')'
    setShowingRecipe(getScrollInDecimal() > 0.2)
  }

  window.addEventListener('scroll', onScroll)

  const onTouchEnd = () => {
    if (getScrollInDecimal() > 0.2) {
      if (getScrollInDecimal() * document.documentElement.clientHeight < 300) {
        // Scroll to recepie
        Scroll.animateScroll.scrollTo(300, { duration: 200 })
      }
    } else {
      // Scroll back!
      Scroll.animateScroll.scrollTo(0, { duration: 200 })
    }
  }

  return (
    <div className='swipe' onScroll={onScroll}>
      <button ref={buttonRef} style={hiddenStyle} onClick={increase}>increase!</button>
      <img className='banner' src={Banner} alt='' />
      <BlurredBackground backgroundURL={currentRecipe.imageURL} height='90vh' />
      <div className='swipeArea'>
        <div className='CardContainer'>
          {recepies.map((recepie, index) =>
            <div style={scaleStyle} className='cardScaler' key={index} ref={scaleRef}>
              <TinderCard className={index > amountOfCardsToShow ? 'tinderCard' : 'tinderCard hidden'} onSwipe={cardSwiped} onCardLeftScreen={() => console.log('left sceen')}>
                <Card key={recepie.id + 'card'} recipe={recepie} />
              </TinderCard>
            </div>
          )}
        </div>
      </div>
      <CSSTransition in={showDescription} timeout={500} classNames='description-transition'>
        <div onTouchEnd={onTouchEnd}>
          <Description arrowDown={showingRecipe} style={{ zIndex: 15 }} recipe={currentRecipe} />
        </div>
      </CSSTransition>
    </div>

  )
}

export default Swipe
