import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import searchImg from 'Assets/searchbar/search.svg';
import './SearchBar.scss';

const SearchBar = ({
  onButtonClick,
  searchQuery,
  setSearchQuery,
  fullSize = true,
  placeholder,
  searchOptions,
  onOptionChange,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    setSearchQuery(query);
    onButtonClick && onButtonClick(query);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const clearQuery = () => {
    const emptyField = '';
    if (query !== '') {
      setQuery(emptyField);
      setSearchQuery(emptyField);
      onButtonClick && onButtonClick(emptyField);
    }
  };

  useEffect(() => {}, [searchQuery]);

  return (
    <div
      className={`searchbar ${fullSize && 'searchbar--full-size'} ${
        searchOptions ? 'searchbar--has-select' : null
      }`}
    >
      <div className="searchbar__title">{fullSize}</div>
      <div className="searchbar__panel">
        <div className="searchbar__input">
          {searchOptions ? (
            <select onChange={({ target }) => onOptionChange(target.value)}>
              {searchOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          ) : null}
          <input
            type="text"
            placeholder={placeholder}
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
          {searchOptions ? null : (
            <img className="searchbar__img" src={searchImg} />
          )}
          <span>Поиск</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onButtonClick: PropTypes.func,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  fullSize: PropTypes.bool,
  placeholder: PropTypes.string,
};
