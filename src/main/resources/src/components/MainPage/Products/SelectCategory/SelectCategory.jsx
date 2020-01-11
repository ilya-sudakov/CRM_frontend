import React, { useState } from 'react';
import './SelectCategory.scss';
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx';
import SearchBar from '../../SearchBar/SearchBar.jsx';

const SelectCategory = (props) => {
    const [showWindow, setShowWindow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }
    return (
        <div className="select-category">
            <div className="select-category__input">
                <div className="select-category__input_name">{props.inputName + (props.required ? '*' : '')}</div>
                <div className={"select-category__input_field"}>
                    <div className="select-category__searchbar">
                        <input
                            type="text"
                            className={props.error === true ? "select-category__input select-category__input--error" : "select-category__input"}
                            onChange={handleInputChange}
                            // onClick={!props.readOnly ? clickOnInput : null}
                            placeholder={props.searchPlaceholder}
                            readOnly={props.readOnly}
                        />
                        <button className="select-category__search_button" onClick={(e) => {
                            e.preventDefault();
                            setShowWindow(!showWindow);
                        }}>Обзор</button>
                    </div>
                </div>
            </div>
            <FormWindow
                title="Категории продукции"
                content={
                    <SearchBar 
                        title="Поиск по категориям"
                        placeholder="Введите название категории для поиска..."
                    />
                }
                showWindow={showWindow}
                setShowWindow={setShowWindow}
            />
        </div>
    );
};

export default SelectCategory;