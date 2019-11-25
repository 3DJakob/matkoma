import React, { useState } from 'react'
import './css/App.css'
import Preferences from './pages/Preferences'

function App () {
  const [route, SetRoute] = useState('preferences')

  return (
    <div className='App'>
      <link rel='stylesheet' href='https://use.typekit.net/kja2qvx.css' />
      {route === 'preferences' ? <Preferences /> : ''}
    </div>
  )
}

export default App
