import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import deleteSVG from '../../../../../../../assets/select/delete.svg';
import './Select.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TableView from '../Products/TableView/TableView.jsx';
import { getProducts } from '../../../utils/RequestsAPI/Products.jsx';

const Select = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);
    const [products, setProducts] = useState([]);

    const search = () => {
        return options.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const clickOnInput = () => {
        const options = document.getElementsByClassName("select__options")[0];
        const overlay = document.getElementsByClassName("select__overlay")[0];
        const error = document.getElementsByClassName("select__error")[0];
        if (options.classList.contains("select__options--hidden")) {
            options.classList.remove("select__options--hidden");
            overlay.classList.remove("select__overlay--hidden");
            error && error.classList.add("select__error--hidden");
        }
        else {
            options.classList.add("select__options--hidden");
            overlay.classList.add("select__overlay--hidden");
            error && error.classList.remove("select__error--hidden");
        }
    }

    const clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("select__overlay")[0];
        if (!overlay.classList.contains("select__overlay--hidden")) {
            overlay.classList.add("select__overlay--hidden");
            clickOnInput();
        }
    }

    const clickOnInputBlur = (event) => {
        console.log(event);
    }

    const loadProducts = () => {
        getProducts()
            .then(response => response.json())
            .then(response => {
                setProducts(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const clickOnOption = (event) => {
        const value = event.target.getAttribute("name");
        const id = event.target.getAttribute("id");
        clickOnInput();
        setSelected([
            ...selected,
            {
                id: id,
                name: value,
                quantity: 0,
                packaging: ""
            }
        ])
        props.onChange([
            ...selected,
            {
                id: id,
                name: value,
                quantity: 0,
                packaging: ""
            }
        ]);
    }

    const clickOnSelected = (event) => {
        const id = event.target.getAttribute("id");
        let newSelected = selected;
        newSelected.splice(id, 1);
        setSelected([...newSelected]);
        props.onChange([...newSelected]);
    }

    const handleParamChange = (event) => {
        const value = event.target.value;
        const name = event.target.getAttribute("name");
        const id = event.target.getAttribute(name + "_id");
        let newSelected = selected;
        newSelected = newSelected.map((item, index) => {
            return ({
                ...item,
                [name]: index == id ? value : item[name]
            })
        })
        setSelected([...newSelected]);
        props.onChange([...newSelected]);
    }

    const clickOnSelectWindow = (e) => {
        e.preventDefault();
        let productsWindow = document.getElementsByClassName("select__window")[0];
        if (!(e.target.classList[0] === "select__window") && !(e.target.classList.contains("select__window_exit")) && !(e.target.classList.contains("select__window_bar"))) {
            productsWindow.classList.remove("select__window--hidden");
        }
        else {
            productsWindow.classList.add("select__window--hidden");
        }
    }

    useEffect(() => {
        if (props.defaultValue !== undefined) {
            setSelected([...props.defaultValue])
        }
        if (props.options !== undefined) {
            setOptions([...props.options])
        }
        loadProducts();
    }, [props.defaultValue, props.options])

    return (
        <div className="select">
            <div className="select__overlay select__overlay--hidden" onClick={clickOverlay}></div>
            {!props.readOnly && <div className="select__searchbar">
                <input
                    type="text"
                    className={props.error === true ? "select__input select__input--error" : "select__input"}
                    onChange={handleInputChange}
                    onClick={!props.readOnly ? clickOnInput : null}
                    placeholder={props.searchPlaceholder}
                    readOnly={props.readOnly}
                />
                <button className="select__search_button" onClick={clickOnSelectWindow}>
                    Обзор
                </button>
                {/* Окно для добавления продукции по категориям */}
                <div className="select__window select__window--hidden" onClick={clickOnSelectWindow}>
                    <div className="select__window_content">
                        <div className="select__window_title">
                            Выбор продукции
                            <Link to="/products/new" className="select__window_button">Создать продукцию</Link>
                            <div className="select__window_exit" onClick={clickOnSelectWindow}>
                                <div className="select__window_bar" onClick={clickOnSelectWindow}></div>
                                <div className="select__window_bar" onClick={clickOnSelectWindow}></div>
                            </div>
                        </div>
                        <SearchBar
                            title="Поиск по продукции"
                            placeholder="Введите название продукции для поиска..."
                            setSearchQuery={null}
                        />
                        <TableView
                            data={products}
                            searchQuery={""}
                            deleteItem={null}
                            selecting
                        />
                    </div>
                </div>
            </div>
            }
            {props.error === true && <div className="select__error" onClick={
                props.setErrorsArr ? (() => props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false
                })) : null
            }>Поле не заполнено!</div>}
            {props.options && <div className="select__options select__options--hidden"
                onBlur={!props.readOnly ? clickOnInputBlur : null}>
                {search().map((item, index) => (
                    <div id={item.id} optionId={index} name={item.name} className="select__option_item" onClick={clickOnOption}>
                        <img className="select__img" src={item.photo} />
                        <div>{'№' + item.id + ', ' + item.name}</div>
                        {/* {item.name} */}
                    </div>
                ))}
            </div>}
            {/* {console.log(selected)} */}
            <div className="select__selected">
                {selected.length !== 0 && <span className="select__selected_title">Выбранная продукция:</span>}
                {selected.map((item, index) => (
                    <div className="select__selected_row">
                        {/* <img className="select__selected_photo" src={item.product ? item.product.photo : null} alt="" /> */}
                        <div className="select__selected_item" >
                            {item.product ? item.product.name : item.name}
                            {!props.readOnly && <img id={index} className="select__img" src={deleteSVG} alt="" onClick={clickOnSelected} />}
                        </div>
                        <div className="select__selected_quantity">
                            Кол-во{!props.readOnly && "*"}
                            <input
                                quantity_id={index}
                                // type="number"
                                type="text"
                                name="quantity"
                                autoComplete="off"
                                defaultValue={item.quantity != 0 ? item.quantity : 0}
                                value={item.quantity}
                                onChange={handleParamChange}
                                readOnly={props.readOnly}
                            />
                        </div>
                        <div className="select__selected_packaging">
                            Фасовка{!props.readOnly && "*"}
                            <textarea
                                packaging_id={index}
                                type="text"
                                name="packaging"
                                autoComplete="off"
                                defaultValue={item.packaging}
                                value={item.packaging}
                                onChange={handleParamChange}
                                readOnly={props.readOnly}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Select;