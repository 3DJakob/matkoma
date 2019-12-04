import React from 'react'
import '../css/Swipe.css'
import Card from '../components/Card'
import Description from '../components/Description'
import BlurredBackground from '../components/BlurredBackground'
import Banner from '../img/receptmatch.svg'
import TinderCard from 'react-tinder-card'

function Swipe ({ recepies }) {
  const recepie = recepies[0]

  const cardSwiped = (dir) => {
    console.log('you swiped it!')
  }

  return (
    <div className='swipe'>
      <img className='banner' src={Banner} alt='' />
      <BlurredBackground backgroundURL={recepie.imageURL} height='90vh' />
      <TinderCard style={{ zIndex: 10 }} onSwipe={cardSwiped}>
        <Card recipe={recepie} />
      </TinderCard>
      <Description style={{ zIndex: 15 }} recipe={recepie} />
    </div>

  )
}

export default Swipe
