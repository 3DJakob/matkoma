import React from 'react'
import './css/App.css'
import recepies from './db/recepies.json'
import getIngridientsFromRecepies from './lib/utils.js'
const ingridients = getIngridientsFromRecepies(recepies)

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://use.typekit.net/kja2qvx.css"></link>
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
