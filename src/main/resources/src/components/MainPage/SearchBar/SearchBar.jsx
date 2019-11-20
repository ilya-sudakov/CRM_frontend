import React, { useState } from 'react';
import searchImg from '../../../../../../../assets/searchbar/search.svg';
import './SearchBar.scss';

const SearchBar = (props) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        props.setSearchQuery(query);
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="searchbar">
            <div className="searchbar__title">{props.title}</div>
            <div className="searchbar__panel">
                <div className="searchbar__input">
                    <input type="text"
                        placeholder={props.placeholder}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleEnterPress}
                    ></input>
                </div>
                <div className="searchbar__searchbutton" onClick={handleSearch}>
                    <img className="searchbar__img" src={searchImg} />
                    <span>Поиск</span>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;