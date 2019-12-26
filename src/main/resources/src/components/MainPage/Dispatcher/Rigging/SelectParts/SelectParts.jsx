import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../../../assets/select/delete.svg';
import './SelectParts.scss';

const SelectParts = (props) => {
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);

    const clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("select_parts__overlay")[0];
        if (!overlay.classList.contains("select_parts__overlay--hidden")) {
            overlay.classList.add("select_parts__overlay--hidden");
        }
    }

    useEffect(() => {
        if (props.defaultValue !== undefined) {
            setSelected([...props.defaultValue])
        }
        if (props.options !== undefined) {
            setOptions([...props.options])
        }
    }, [props.defaultValue, props.options])

    const clickOnForm = (e) => {
        const id = e.currentTarget.getAttribute("index");
        const form = document.getElementsByClassName("select_parts__selected_form")[id];
        if (form.classList.contains("select_parts__selected_form--hidden")) {
            e.target.type !== 'text' && !e.target.classList.contains("select_parts__img") && form.classList.remove("select_parts__selected_form--hidden");
        }
        else {
            e.target.type !== 'text' && !e.target.classList.contains("select_parts__img") && form.classList.add("select_parts__selected_form--hidden");
        }
    }

    const handleNewPart = (e) => {
        e.preventDefault();
        setSelected([
            ...selected,
            {
                number: '',
                name: '',
                amount: '',
                location: '',
                comment: '',
                cuttingDimensions: '',
                milling: '',
                harding: '',
                grinding: '',
                erosion: '',
                controll: ''
            }
        ]);
        props.handlePartsChange([
            ...selected,
            {
                number: '',
                name: '',
                amount: '',
                location: '',
                comment: '',
                cuttingDimensions: '',
                milling: '',
                harding: '',
                grinding: '',
                erosion: '',
                controll: ''
            }
        ])
    }

    const deletePart = (e) => {
        const id = e.target.getAttribute("index");
        let temp = selected;
        temp.splice(id, 1);
        setSelected([...temp]);
        props.handlePartsChange([...temp]);
    }

    const handleInputChange = (event) => {
        const id = event.target.getAttribute("index");
        const name = event.target.getAttribute("name");
        const value = event.target.value;
        let temp = selected;
        let originalItem = selected[id];
        temp.splice(id, 1, {
            ...originalItem,
            [name]: value
        })
        setSelected([...temp]);
        props.handlePartsChange([...temp])
    }

    return (
        <div className="select_parts">
            <div className="select_parts__overlay select_parts__overlay--hidden" onClick={clickOverlay}></div>
            {!props.readOnly &&
                <button className="select_parts__button" onClick={handleNewPart}>
                    Добавить деталь
                </button>
            }
            <div className="select_parts__selected">
                {selected.map((item, index) => (
                    <div className="select_parts__selected_item" >
                        <div className="select_parts__selected_header" index={index} onClick={clickOnForm}>
                            <div className="select_parts__selected_name">
                                <span>Название: </span> {item.name}
                            </div>
                            <div className="select_parts__selected_name">
                                <span>Артикул: </span> {item.number}
                            </div>
                            <div className="select_parts__selected_name">
                                <span>Комментарий: </span> {item.comment}
                            </div>
                        </div>
                        <div className="select_parts__selected_form select_parts__selected_form--hidden" >
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Название</div>
                                <div className="select_parts__input_field">
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
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Артикул</div>
                                <div className="select_parts__input_field">
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
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Кол-во</div>
                                <div className="select_parts__input_field">
                                    <input
                                        type="text"
                                        name="amount"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.amount}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Местоположение</div>
                                <div className="select_parts__input_field">
                                    <input
                                        type="text"
                                        name="location"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.location}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Комментарий</div>
                                <div className="select_parts__input_field">
                                    <input
                                        type="text"
                                        name="comment"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.comment}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Распил/Габариты</div>
                                <div className="select_parts__input_field">
                                    <input
                                        type="text"
                                        name="cuttingDimensions"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.cuttingDimensions}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Фрезеровка/Точение</div>
                                <div className="select_parts__input_field">
                                    <input
                                        type="text"
                                        index={index}
                                        name="milling"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.milling}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Закалка</div>
                                <div className="select_parts__input_field">
                                    <input
                                        type="text"
                                        index={index}
                                        name="harding"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.harding}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Шлифовка</div>
                                <div className="select_parts__input_field">
                                    <input
                                        type="text"
                                        index={index}
                                        name="grinding"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.grinding}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Эрозия</div>
                                <div className="select_parts__input_field">
                                    <input
                                        type="text"
                                        name="erosion"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.erosion}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select_parts__item">
                                <div className="select_parts__input_name">Проверка</div>
                                <div className="select_parts__input_field">
                                    <input
                                        type="text"
                                        name="controll"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.controll}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                        </div>
                        {!props.readOnly &&
                            <img index={index} onClick={deletePart} className="select_parts__img" src={deleteSVG} />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectParts;