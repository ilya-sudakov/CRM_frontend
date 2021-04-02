import { useState, useEffect } from 'react';
import useFormWindow from 'Utils/hooks/useFormWindow';
import PropTypes from 'prop-types';
import searchImg from 'Assets/searchbar/search.svg';
import OptionsSVG from 'Assets/searchbar/options-16-regular.inline.svg';
import './SearchBar.scss';
import AdvancedOptions from './AdvancedOptions/AdvancedOptions.jsx';

const SearchBar = ({
  onButtonClick,
  searchQuery,
  setSearchQuery,
  fullSize = true,
  placeholder = 'Введите запрос для поиска...',
  searchOptions,
  onOptionChange,
  advancedOptions,
  setAdvancedOptions,
}) => {
  const [query, setQuery] = useState('');

  const { formWindow, toggleFormWindow } = useFormWindow(
    'Выбор опций',
    <AdvancedOptions
      advancedOptions={advancedOptions}
      setAdvancedOptions={setAdvancedOptions}
    />,
    [advancedOptions, setAdvancedOptions],
  );

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

  useEffect(() => {}, [searchQuery, advancedOptions]);

  const screenIsMobile =
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) <= 425;

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
          {advancedOptions ? (
            <div
              className={`searchbar__advanced-options ${
                query.length > 0 ? 'searchbar__advanced-options--moved' : ''
              }`}
            >
              <OptionsSVG
                fill="#999999"
                className="searchbar__img searchbar__img--options"
                onClick={() => toggleFormWindow()}
                title="Расширенные опции"
              />
              {formWindow}
            </div>
          ) : null}
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
          {searchOptions && !screenIsMobile ? null : (
            <img
              className="searchbar__img searchbar__img--search"
              src={searchImg}
            />
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
  searchOptions: PropTypes.array,
  advancedOptions: PropTypes.array,
};
