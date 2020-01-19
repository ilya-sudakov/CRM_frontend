import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../assets/select/delete.svg';
import './Select.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TableView from '../Products/TableView/TableView.jsx';
import { getCategories } from '../../../utils/RequestsAPI/Products/Categories.jsx';
import FormWindow from '../../../utils/Form/FormWindow/FormWindow.jsx';
import ColorPicker from './ColorPicker/ColorPicker.jsx';

const Select = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryCategory, setSearchQueryCategory] = useState('');
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showWindow, setShowWindow] = useState(false);

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

    const loadCategories = () => {
        getCategories()
            .then(response => response.json())
            .then(response => {
                setCategories(response);
                let result = [];
                let temp = response.map((cat) => {
                    let products = cat.products.map(item => {
                        return item;
                    })
                    result.push(...products);
                })
                Promise.all(temp)
                    .then(() => {
                        setOptions([...result]);
                    })
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

    const selectProduct = (id, value) => {
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

    useEffect(() => {
        if (props.defaultValue !== undefined) {
            setSelected([...props.defaultValue])
        }
        // if (props.options !== undefined) {
        //     setOptions([...props.options])
        // }
        loadCategories();
    }, [props.defaultValue])

    return (
        <div className="select">
            <div className="select__overlay select__overlay--hidden" onClick={clickOverlay}></div>
            {(!props.readOnly && !props.workshop) && <div className="select__searchbar">
                <input
                    type="text"
                    className={props.error === true ? "select__input select__input--error" : "select__input"}
                    onChange={handleInputChange}
                    onClick={!props.readOnly ? clickOnInput : null}
                    placeholder={props.searchPlaceholder}
                    readOnly={props.readOnly || props.workshop}
                />
                <button className="select__search_button" onClick={(e) => {
                    e.preventDefault();
                    setShowWindow(!showWindow);
                }}>
                    Обзор
                </button>
                <FormWindow
                    title="Выбор продукции"
                    content={
                        <React.Fragment>
                            <SearchBar
                                title="Поиск по продукции"
                                placeholder="Введите название продукции для поиска..."
                                setSearchQuery={setSearchQueryCategory}
                            />
                            <TableView
                                // data={products}
                                categories={categories}
                                searchQuery={searchQueryCategory}
                                deleteItem={null}
                                selectProduct={selectProduct}
                            />
                        </React.Fragment>
                    }
                    // content={<WindowContent
                    //     categories={categories}
                    //     showWindow={showWindow}
                    //     setShowWindow={setShowWindow}
                    //     searchQuery={searchQueryCategory}
                    //     deleteItem={null}
                    //     selectProduct={selectProduct}
                    //     setSearchQuery={setSearchQueryCategory}
                    // />}
                    headerButton={{
                        name: 'Создать продукцию',
                        path: '/products/new'
                    }}
                    showWindow={showWindow}
                    setShowWindow={setShowWindow}
                />
            </div>
            }
            {props.error === true && <div className="select__error" onClick={
                props.setErrorsArr ? (() => props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false
                })) : null
            }>Поле не заполнено!</div>}
            {props.options && <div className="select__options select__options--hidden">
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
                        <div className={"select__selected_item select__selected_item--" + (item.color ? item.color : "production")}>
                            {/* {item.name} */}
                            {!props.readOnly ? <ColorPicker
                                defaultName={item.name}
                                index={index}
                                id={item.id}
                                // loadData={props.loadData}
                            /> : <div className="select__selected_name">{item.name}</div>}
                            {(!props.readOnly && !props.workshop) && <img id={index} className="select__img" src={deleteSVG} alt="" onClick={clickOnSelected} />}
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
                                readOnly={props.readOnly || props.workshop}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const WindowContent = (props) => {
    useEffect(() => {
        console.log('windowcontent');
    }, [])
    return (
        <React.Fragment>
            <SearchBar
                title="Поиск по продукции"
                placeholder="Введите название продукции для поиска..."
                setSearchQuery={props.setSearchQueryCategory}
            />
            <TableView
                // data={products}
                categories={props.categories}
                searchQuery={props.searchQueryCategory}
                deleteItem={null}
                selectProduct={props.selectProduct}
            />
        </React.Fragment>
    );
};

export default Select;