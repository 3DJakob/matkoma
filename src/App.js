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
  const onBack = () => {
    SetRoute('preferences')
  }
  return (
    <div className='App'>
      <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#6fc48c' />
      <meta name='msapplication-TileColor' content='#6fc48c' />
      <meta name='theme-color' content='#6fc48c' />
      <link href='https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap' rel='stylesheet' />
      {window.scrollTo(0, 0) /* scroll up on route change} */}
      <meta name='viewport' content='width=device-width, user-scalable=no' />
      <link rel='stylesheet' href='https://use.typekit.net/kja2qvx.css' />
      {route === 'preferences' ? <Preferences onRecepieResult={onFilteredRecepies} recepies={recipes} /> : ''}
      {route === 'swipe' ? <Swipe recepies={resultRecepies} onBack={onBack} /> : ''}
    </div>
  )
}

export default App
