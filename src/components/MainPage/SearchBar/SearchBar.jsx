import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'Utils/Form/CheckBox/CheckBox.jsx';
import searchImg from 'Assets/searchbar/search.svg';
import OptionsSVG from 'Assets/searchbar/options-16-regular.inline.svg';
import './SearchBar.scss';
import styled from 'styled-components';
import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';

const SearchBar = ({
  onButtonClick,
  searchQuery,
  setSearchQuery,
  fullSize = true,
  placeholder,
  searchOptions,
  onOptionChange,
  advancedOptions,
  setAdvancedOptions,
}) => {
  const [query, setQuery] = useState('');
  const [showWindow, setShowWindow] = useState(false);
  const [advanced, setAdvanced] = useState(advancedOptions);
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

  useEffect(() => {}, [searchQuery, advancedOptions, setAdvancedOptions]);

  const screenIsMobile =
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) <= 425;

  const changeOptions = (index, value, type = 'groupCheckbox', optional) => {
    if (type === 'groupCheckbox') {
      let temp = advanced;
      temp.splice(index, 1, {
        ...temp[index],
        [optional.fieldName]: {
          text: temp[index][optional.fieldName].text,
          value: value,
        },
      });
      setAdvanced([...temp]);
    }
  };

  const options = (
    <AdvancedOptions
      advancedOptions={advanced}
      setAdvancedOptions={(index, value, type, options) =>
        changeOptions(index, value, type, options)
      }
    />
  );

  const formWindow = (
    <FormWindow
      title={'Выбор опций'}
      content={options}
      showWindow={showWindow}
      setShowWindow={setShowWindow}
    />
  );

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
            className={`searchbar__advanced-options ${
              query.length > 0 ? 'searchbar__advanced-options--moved' : ''
            }`}
          >
            <OptionsSVG
              className="searchbar__img searchbar__img--options"
              onClick={() => setShowWindow(!showWindow)}
            />
            {advancedOptions ? formWindow : null}
            {advancedOptions ? options : null}
          </div>
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

const AdvancedOptions = ({ advancedOptions, setAdvancedOptions }) => {
  const GroupOption = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    padding: 15px 20px;
    padding-bottom: 0;
  `;

  const GroupCheckbox = styled(GroupOption)`
    display: flex;
    flex-direction: column;

    .checkbox {
      .checkbox__text {
        color: #333;
      }
      &:not(:first-child) {
        --checkbox__checkmark--size: 18px;
        .checkbox__text {
          font-size: 0.8rem;
          color: #999;
        }
      }
    }
  `;

  useEffect(() => {
    console.log(123, advancedOptions);
  }, [advancedOptions]);

  return (
    <div>
      {advancedOptions.map((option, index) => {
        if (option.type === 'groupCheckbox') {
          return (
            <GroupCheckbox key={index}>
              <CheckBox
                text={option.parentCheckbox.text}
                id={option.parentCheckbox.text}
                checked={option.parentCheckbox.value}
                onChange={(value) =>
                  setAdvancedOptions(index, value, 'groupCheckbox', {
                    fieldName: 'parentCheckbox',
                  })
                }
              />
              {option.parentCheckbox.value && (
                <CheckBox
                  text={option.childCheckbox.text}
                  id={option.childCheckbox.text}
                  checked={option.childCheckbox.value}
                  onChange={(value) =>
                    setAdvancedOptions(index, value, 'groupCheckbox', {
                      fieldName: 'childCheckbox',
                    })
                  }
                />
              )}
            </GroupCheckbox>
          );
        }
      })}
    </div>
  );
};
