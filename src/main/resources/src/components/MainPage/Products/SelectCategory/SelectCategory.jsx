import React, { useState, useEffect } from 'react';
import './SelectCategory.scss';
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableViewCategory from '../CategoryManagement/TableView/TableViewCategory.jsx';
import { getCategories, getCategoriesNames } from '../../../../utils/RequestsAPI/Products/Categories.jsx';

const SelectCategory = (props) => {
    const [showWindow, setShowWindow] = useState(false);
    const [closeWindow, setCloseWindow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [id, setId] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    useEffect(() => {
        (categories.length === 0) && loadCategories();
    }, [])

    const loadCategories = () => {
        getCategoriesNames()
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                setCategories(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteItemCategory = (event) => {
        const id = event.target.dataset.id;
        deleteCategory(id)
            .then(() => loadCategories())
    }

    const clickCategory = (categoryId) => {
        setId(categoryId);
        props.handleCategoryChange(categoryId)
        setShowWindow(!showWindow)
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
                            // onChange={props.handleInputChange}
                            value={props.defaultValue ? props.defaultValue : id}
                            // onClick={!props.readOnly ? clickOnInput : null}
                            placeholder="Выберите категорию, нажав на кнопку 'Обзор'"
                            readOnly={props.readOnly}
                        />
                        <button className="select-category__search_button" onClick={(e) => {
                            e.preventDefault();
                            setShowWindow(!showWindow);
                        }}>Обзор</button>
                    </div>
                </div>
            </div>
            {props.error === true && <div className="select-category__error" onClick={
                props.setErrorsArr ? (() => props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false
                })) : null
            }>Поле не заполнено!</div>}
            <FormWindow
                title="Категории продукции"
                content={
                    <React.Fragment>
                        <SearchBar
                            title="Поиск по категориям"
                            setSearchQuery={setSearchQuery}
                            placeholder="Введите название категории для поиска..."
                        />
                        <TableViewCategory
                            data={categories}
                            searchQuery={searchQuery}
                            userHasAccess={props.userHasAccess}
                            deleteItem={deleteItemCategory}
                            selectCategory={clickCategory}
                            setCloseWindow={setCloseWindow}
                            closeWindow={closeWindow}
                            setShowWindow={setShowWindow}
                        />
                    </React.Fragment>
                }
                headerButton={{
                    name: 'Создать категорию',
                    path: '/products/category/new'
                }}
                showWindow={showWindow}
                setShowWindow={setShowWindow}
            />
        </div>
    );
};

export default SelectCategory;