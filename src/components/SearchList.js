import React, { useState } from 'react'
import Fuse from 'fuse.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const options = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1
}

function SearchList ({ placeholder, numberOfVisibleInResult, list, onClick }) {
  const [input, setInput] = useState('')
  const [results, setResults] = useState([])

  var fuse = new Fuse(list, options) // "list" is the item array

  const parentStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)',
    borderRadius: 20,
    overflow: 'hidden'
  }

  const inputStyle = {
    borderRadius: 20,
    border: 'none',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)',
    padding: 10,
    margin: 0,
    fontSize: 14
  }

  const suggestionContainerStyle = {
    height: results.length > numberOfVisibleInResult ? numberOfVisibleInResult * 36 : results.length * 36,
    transition: '200ms height',
    overflow: 'scroll'
  }

  const onInput = (e) => {
    setInput(e.target.value)
    const results = fuse.search(e.target.value)
    setResults(results.map(i => list[i]))
  }

  const onClickIngredient = (ingredient) => {
    onClick(ingredient)
    setInput('')
    setResults([])
  }

  return (
    <div style={parentStyle}>
      <input style={inputStyle} placeholder={placeholder} value={input} onChange={onInput} />
      <div style={suggestionContainerStyle}>
        {results.map((result) => <SearchMatch onClick={() => onClickIngredient(result)} name={result} key={result} />)}
      </div>
    </div>
  )
}

function SearchMatch ({ name, onClick }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
    height: 36
  }

  const pStyle = {
    flexGrow: 1,
    margin: 0,
    padding: 5,
    paddingLeft: 10,
    color: '#888',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }

  const iconStyle = {
    color: '#ccc',
    marginRight: 11,
    width: 11
  }

  return (
    <div style={containerStyle}>
      <p onClick={onClick} style={pStyle}>{name}</p>
      <FontAwesomeIcon style={iconStyle} icon={faPlus} />
    </div>
  )
}

export default SearchList
