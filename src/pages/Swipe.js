import React, { useState, useEffect, useRef } from 'react'
import '../css/Swipe.css'
import Card from '../components/Card'
import Description from '../components/Description'
import BlurredBackground from '../components/BlurredBackground'
import NoResults from '../components/NoResults'
import Banner from '../img/receptmatch.svg'
import TinderCard from 'react-tinder-card'
import { CSSTransition } from 'react-transition-group'
import * as Scroll from 'react-scroll'
import SearchButton from '../components/SearchButton'

const cardsToShowAtTheTime = 4
function Swipe ({ recepies, onBack }) {
  const buttonRef = useRef(null)
  const scaleRef = useRef(null)
  const [amountOfCardsToShow, setAmountOfCardsToShow] = useState(recepies.length - cardsToShowAtTheTime)
  const [currentRecipe, setCurrentRecipe] = useState(recepies[recepies.length - 1])
  const [showDescription, setShowDescription] = useState(false)
  const [showingRecipe, setShowingRecipe] = useState(false)
  const [noRecipeTap, setNoRecipeTap] = useState(false)

  useEffect(() => {
    setShowDescription(true)
    if (currentRecipe) {
      document.title = currentRecipe.title
    }
  })
  const cardSwiped = (dir) => {
    setShowDescription(false)
    buttonRef.current.click()
  }

  const increase = () => {
    setAmountOfCardsToShow(amountOfCardsToShow - 1)
    if (amountOfCardsToShow - 1 === -cardsToShowAtTheTime) {
      console.log('all recepies swiped!')
      setCurrentRecipe(null)
    } else {
      setCurrentRecipe(recepies[amountOfCardsToShow + cardsToShowAtTheTime - 2])
    }
  }

  const hiddenStyle = {
    display: 'none'
  }

  const getScrollInDecimal = () => {
    return (window.scrollY / (document.documentElement.clientHeight - 150))
  }

  const onScroll = (e) => {
    if (!scaleRef.current) { return }
    const res = Math.max(Math.min(1 + getScrollInDecimal(), 1.30), 1)
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
      setNoRecipeTap(true)
    } else {
      // Scroll back! > 0 to not animate on iOS negative rubberbanding
      if (getScrollInDecimal() > 0) {
        Scroll.animateScroll.scrollTo(0, { duration: 200 })
      }
      setNoRecipeTap(false)
    }
  }

  const bannerContainerStyle = {
    transform: currentRecipe ? 'translateY(0)' : 'translateY(-100vh)'
  }

  return (
    <div className='swipe' onScroll={onScroll}>
      <SearchButton func={onBack} />
      <button ref={buttonRef} style={hiddenStyle} onClick={increase}>increase!</button>
      <div style={bannerContainerStyle} className='banner'>
        <img src={Banner} alt='' />
      </div>
      {currentRecipe ? <BlurredBackground backgroundURL={currentRecipe.imageURL} /> : <BlurredBackground />}
      <div className='swipeArea'>
        {noRecipeTap ? <div onTouchEnd={onTouchEnd} className='noTap' /> : ''}
        <div className='CardContainer' ref={scaleRef}>
          {recepies.map((recepie, index) =>
            <TinderCard key={index} className={index > amountOfCardsToShow ? 'tinderCard' : 'tinderCard hidden'} onSwipe={cardSwiped} onCardLeftScreen={() => console.log('left sceen')}>
              <Card key={recepie.id + 'card'} showfront={index > amountOfCardsToShow + cardsToShowAtTheTime - 2} recipe={recepie} />
            </TinderCard>
          )}
          {currentRecipe ? '' : <NoResults onClick={onBack} />}
        </div>
      </div>
      <CSSTransition in={showDescription} timeout={500} classNames='description-transition'>
        <div onTouchEnd={onTouchEnd}>
          {currentRecipe ? <Description arrowDown={showingRecipe} style={{ zIndex: 15 }} recipe={currentRecipe} /> : ''}
        </div>
      </CSSTransition>
    </div>

  )
}

export default Swipe
