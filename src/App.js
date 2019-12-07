import React, { useState } from 'react'
import './css/App.css'
import Preferences from './pages/Preferences'
import Swipe from './pages/Swipe'
import recipes from './db/recipes.json'

function App () {
  const [route, SetRoute] = useState('swipe')

  return (
    <div className='App'>
      <meta name='viewport' content='width=device-width, user-scalable=no' />
      <link rel='stylesheet' href='https://use.typekit.net/kja2qvx.css' />
      {route === 'preferences' ? <Preferences recipes={recipes} /> : ''}
      {route === 'swipe' ? <Swipe recipes={recipes} /> : ''}
    </div>
  )
}

export default App
