import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../../assets/select/delete.svg';
import './SelectPriceItem.scss';

const SelectPriceItem = (props) => {
    const [selected, setSelected] = useState([
        {
            name: '',
            description: '',
            retailPrice: 0,
            lessThan1500Price: 0,
            lessThan5000Price: 0
        }
    ]);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("select-price-item__overlay")[0];
        if (!overlay.classList.contains("select-price-item__overlay--hidden")) {
            overlay.classList.add("select-price-item__overlay--hidden");
        }
    }

    useEffect(() => {
        if (props.defaultValue !== undefined) {
            setSelected([...props.defaultValue]);
        }
        if (props.options !== undefined) {
            setOptions([...props.options])
        }

    }, [props.defaultValue, props.options])

    const clickOnForm = (e) => {
        const id = e.currentTarget.getAttribute("index");
        const form = document.getElementsByClassName("select-price-item__selected_form")[id];
        if (form.classList.contains("select-price-item__selected_form--hidden")) {
            e.target.type !== 'text' && !e.target.classList.contains("select-price-item__img") && form.classList.remove("select-price-item__selected_form--hidden");
        }
        else {
            e.target.type !== 'text' && !e.target.classList.contains("select-price-item__img") && form.classList.add("select-price-item__selected_form--hidden");
        }
    }

    const handleNewPriceItem = (e) => {
        e.preventDefault();
        //Открыть по дефолту форму
        const id = selected.length;
        setSelected([
            ...selected,
            {
                name: '',
                description: '',
                retailPrice: 0,
                lessThan1500Price: 0,
                lessThan5000Price: 0
            }
        ]);
        props.handlePriceItemChange([
            ...selected,
            {
                name: '',
                description: '',
                retailPrice: 0,
                lessThan1500Price: 0,
                lessThan5000Price: 0
            }
        ]);
    }

    const deletePriceItem = (e) => {
        const id = e.target.getAttribute("index");
        let temp = selected;
        temp.splice(id, 1);
        setSelected([...temp]);
        props.handlePriceItemChange([...temp]);
    }

    const handleInputChange = (event) => {
        const id = event.target.getAttribute("index");
        const name = event.target.getAttribute("name");
        let value = event.target.value;
        let temp = selected;
        let originalItem = selected[id];
        temp.splice(id, 1, {
            ...originalItem,
            [name]: value
        })
        setSelected([...temp]);
        props.handlePriceItemChange([...temp])
    }

    return (
        <div className="select-price-item">
            <div className="select-price-item__overlay select-price-item__overlay--hidden" onClick={clickOverlay}></div>
            {!props.readOnly &&
                <button className="select-price-item__button" onClick={handleNewPriceItem}>
                    Добавить продукцию
                </button>
            }
            <div className="select-price-item__selected">
                {selected.map((item, index) => (
                    <div className="select-price-item__selected_item" >
                        <div className="select-price-item__selected_header" index={index} onClick={clickOnForm}>
                            <div className="select-price-item__selected_name">
                                <span>Артикул: </span> <span>{item.number}</span>
                            </div>
                            <div className="select-price-item__selected_name">
                                <span>Описание: </span> <span>{item.description}</span>
                            </div>
                            <div className="select-price-item__selected_name">
                                <span>Розница: </span> <span>{item.retailPrice}</span>
                            </div>
                            <div className="select-price-item__selected_name">
                                <span>до 1500 шт.: </span> <span>{item.lessThan1500Price}</span>
                            </div>
                            <div className="select-price-item__selected_name">
                                <span>до 5000 шт.: </span> <span>{item.lessThan5000Price}</span>
                            </div>
                        </div>
                        <div className="select-price-item__selected_form" >
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Название</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="text"
                                        name="name"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.name}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Артикул</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="text"
                                        name="number"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.number}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Описание</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="text"
                                        name="description"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.description}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Розница</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="retailPrice"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.retailPrice}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">до 1500 шт.</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="lessThan1500Price"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.lessThan1500Price}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">до 5000 шт.</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="lessThan5000Price"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.lessThan5000Price}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                        </div>
                        {!props.readOnly && (index !== 0) &&
                            <img index={index} onClick={deletePriceItem} className="select-price-item__img" src={deleteSVG} />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectPriceItem;