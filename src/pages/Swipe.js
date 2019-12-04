import React from 'react'
import '../css/Swipe.css'
import Card from '../components/Card'
import Description from '../components/Description'
import BlurredBackground from '../components/BlurredBackground'
import Banner from '../img/receptmatch.svg'

console.log(Banner)
function Swipe ({ recepie }) {
  return (
    <div className='swipe'>
      <img className='banner' src={Banner} alt='' />
      <BlurredBackground backgroundURL={recepie.imageURL} height='90vh' />
      <Card recipe={recepie} showfront />
      <Description recipe={recepie} />
    </div>

  )
}

export default Swipe
