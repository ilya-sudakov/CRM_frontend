import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import searchImg from '../../../../../../../../assets/searchbar/search.svg';
// import plusImg from '../../../../../../../../assets/searchbar/plus.svg';
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
            <div className="searchbar__title">Поиск по заявкам</div>
            <div className="searchbar__panel">
                <div className="searchbar__input">
                    <input type="text"
                        placeholder="Введите название продукции для поиска..."
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleEnterPress}
                    ></input>
                </div>
                <div className="searchbar__searchbutton" onClick={handleSearch}>
                    <img className="searchbar__img" src={searchImg} />
                    <span>Поиск</span>
                </div>
                {/* <Link className="searchbar__addItem" to="requests/new">
                    <img className="searchbar__img" src={plusImg} />
                    <span>Добавить заявку</span>
                </Link> */}
            </div>
        </div>
    );
};

export default SearchBar;