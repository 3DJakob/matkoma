import React, { useState } from 'react'
import './css/App.css'
import Preferences from './pages/Preferences'
import Swipe from './pages/Swipe'
import recipes from './db/recipes.json'

function App () {
  const [route, SetRoute] = useState('preferences')
  const [resultRecepies, setResultRecepies] = useState([])

  const onFilteredRecepies = (recepies) => {
    setResultRecepies(recepies)
    SetRoute('swipe')
  }

  return (
    <div className='App'>
      {window.scrollTo(0, 0) /* scroll up on route change} */}
      <meta name='viewport' content='width=device-width, user-scalable=no' />
      <link rel='stylesheet' href='https://use.typekit.net/kja2qvx.css' />
      {route === 'preferences' ? <Preferences onRecepieResult={onFilteredRecepies} recepies={recipes} /> : ''}
      {route === 'swipe' ? <Swipe recepies={resultRecepies} /> : ''}
    </div>
  )
}

export default App
