import React, {useState} from 'react'
import Fuse from 'fuse.js';


const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
}

function SearchList ({placeholder, list, onClick}) {
  const [input, setInput] = useState('')
  const [results, setResults] = useState([])

  var fuse = new Fuse(list, options); // "list" is the item array

  const parentStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.3)',
    borderRadius: 20,
    overflow: 'hidden',

    maxWidth: 200 // remove me for production
  }

  const inputStyle = {
    borderRadius: 20,
    border: 'none',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.3)',
    padding: 10,
    margin: 0,
    fontSize: 14
  }

  const suggestionContainerStyle = {
    maxHeight: 200,
    overflow: 'scroll',
  }

  const onInput = (e) => {
    setInput(e.target.value)
    const results = fuse.search(e.target.value)
    setResults(results.map(i => list[i]))
  }

  const onClickIngridient = (ingridient) => {
    onClick(ingridient)
    setInput('')
    setResults([])
  }

  return (
    <div style={parentStyle}>
      <input style={inputStyle} placeholder={placeholder} value={input} onChange={onInput}></input>
        <div style={suggestionContainerStyle}>
        {results.map((result) => <SearchMatch onClick={() => onClickIngridient(result)} name={result} key={result}/>)}
      </div>
    </div>
  )
}

function SearchMatch ({name, onClick}) {
  const pStyle = {
    margin: 0,
    padding: 5,
    paddingLeft: 10,
    color: '#888'
  }

  return (
    <div>
      <p onClick={onClick} style={pStyle}>{name}</p>
      {/* TO ADD font awesome + icon */}
    </div>
  )
}

export default SearchList