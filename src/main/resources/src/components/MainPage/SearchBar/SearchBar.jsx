import React, { useState, useEffect } from 'react'
import searchImg from '../../../../../../../assets/searchbar/search.svg'
import './SearchBar.scss'

const SearchBar = (props) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    props.setSearchQuery(query)
    props.onButtonClick && props.onButtonClick(query)
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const clearQuery = () => {
    const emptyField = ''
    if (query !== '') {
      setQuery(emptyField)
      props.setSearchQuery(emptyField)
      props.onButtonClick && props.onButtonClick(emptyField)
    }
  }

  useEffect(() => {
    // console.log(props.searchQuery);
  }, [props.searchQuery])

  return (
    <div className="searchbar">
      <div className="searchbar__title">{props.title}</div>
      <div className="searchbar__panel">
        <div className="searchbar__input">
          <input
            type="text"
            placeholder={props.placeholder}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleEnterPress}
            value={query}
          ></input>
          <div
            className={
              query !== ''
                ? 'searchbar__exit'
                : 'searchbar__exit searchbar__exit--hidden'
            }
            onClick={clearQuery}
          >
            <div className="searchbar__bar" onClick={clearQuery}></div>
            <div className="searchbar__bar" onClick={clearQuery}></div>
          </div>
        </div>
        <div className="searchbar__searchbutton" onClick={handleSearch}>
          <img className="searchbar__img" src={searchImg} />
          <span>Поиск</span>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
