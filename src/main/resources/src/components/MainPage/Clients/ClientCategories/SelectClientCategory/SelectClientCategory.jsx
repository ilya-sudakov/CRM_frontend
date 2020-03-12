import React, { useState, useEffect } from 'react';
import './SelectClientCategory.scss';
import FormWindow from '../../../../../utils/Form/FormWindow/FormWindow.jsx';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getClientCategories } from '../../../../../utils/RequestsAPI/Clients/Categories.jsx';

const SelectClientCategory = (props) => {
    const [showWindow, setShowWindow] = useState(false);
    const [closeWindow, setCloseWindow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [id, setId] = useState(0);
    const [fullName, setFullName] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    useEffect(() => {
        (categories.length === 0) && loadCategories();
    }, [])

    const loadCategories = () => {
        getClientCategories()
            .then(res => res.json())
            .then(res => {
                setCategories(res);
            })
    }

    const clickCategory = (categoryId, categoryName) => {
        setId(categoryId);
        setFullName(categoryName);
        props.handleCategoryChange(categoryId);
        setShowWindow(!showWindow);
    }

    return (
        <div className="select-employee">
            <div className="select-employee__input">
                <div className="select-employee__input_name">{props.inputName + (props.required ? '*' : '')}</div>
                <div className={"select-employee__input_field"}>
                    {!props.readOnly && <button className="select-employee__button" onClick={(e) => {
                        e.preventDefault();
                        setShowWindow(!showWindow);
                    }}>Выбрать категорию</button>}
                    <div className="select-employee__searchbar">
                        <input
                            type="text"
                            className={props.error === true ? "select-employee__input select-employee__input--error" : "select-employee__input"}
                            // onChange={props.handleInputChange}
                            defaultValue={props.defaultValue ? props.defaultValue : fullName}
                            // onClick={!props.readOnly ? clickOnInput : null}
                            placeholder="Выберите категорию клиента, нажав на кнопку 'Выбрать категорию'"
                            readOnly={props.readOnly}
                        />
                    </div>
                </div>
            </div>
            {props.error === true && <div className="select-employee__error" onClick={
                props.setErrorsArr ? (() => props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false
                })) : null
            }>Поле не заполнено!</div>}
            <FormWindow
                title="Выбор категории клиента"
                windowName="select-client-category-window"
                content={
                    <React.Fragment>
                        <SearchBar
                            title="Поиск по категориям"
                            setSearchQuery={setSearchQuery}
                            placeholder="Введите запрос для поиска..."
                        />
                        <TableView
                            data={categories}
                            searchQuery={searchQuery}
                            userHasAccess={props.userHasAccess}
                            selectCategory={clickCategory}
                            setCloseWindow={setCloseWindow}
                            closeWindow={closeWindow}
                            setShowWindow={setShowWindow}
                        />
                    </React.Fragment>
                }
                showWindow={showWindow}
                setShowWindow={setShowWindow}
            />
        </div>
    );
};

export default SelectClientCategory;