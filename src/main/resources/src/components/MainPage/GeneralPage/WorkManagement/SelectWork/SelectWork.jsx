import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../../../assets/select/delete.svg';
import './SelectWork.scss';

const SelectWork = (props) => {
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);

    const clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("select-work__overlay")[0];
        if (!overlay.classList.contains("select-work__overlay--hidden")) {
            overlay.classList.add("select-work__overlay--hidden");
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
        const form = document.getElementsByClassName("select-work__selected_form")[id];
        if (form.classList.contains("select-work__selected_form--hidden")) {
            e.target.type !== 'text' && !e.target.classList.contains("select-work__img") && form.classList.remove("select-work__selected_form--hidden");
        }
        else {
            e.target.type !== 'text' && !e.target.classList.contains("select-work__img") && form.classList.add("select-work__selected_form--hidden");
        }
    }

    const handleNewPart = (e) => {
        e.preventDefault();
        setSelected([
            ...selected,
            {
                number: '',
                name: '',
            }
        ]);
        props.handleWorkChange([
            ...selected,
            {
                number: '',
                name: '',
            }
        ])
    }

    const deletePart = (e) => {
        const id = e.target.getAttribute("index");
        let temp = selected;
        temp.splice(id, 1);
        setSelected([...temp]);
        props.handleWorkChange([...temp]);
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
        props.handleWorkChange([...temp])
    }

    return (
        <div className="select-work">
            <div className="select-work__overlay select-work__overlay--hidden" onClick={clickOverlay}></div>
            {!props.readOnly &&
                <button className="select-work__button" onClick={handleNewPart}>
                    Добавить работу
                </button>
            }
            <div className="select-work__selected">
                {selected.map((item, index) => (
                    <div className="select-work__selected_item" >
                        <div className="select-work__selected_header" index={index} onClick={clickOnForm}>
                            <div className="select-work__selected_name">
                                <span>Название: </span> {item.name}
                            </div>
                            <div className="select-work__selected_name">
                                <span>Артикул: </span> {item.number}
                            </div>
                            <div className="select-work__selected_name">
                                <span>Комментарий: </span> {item.comment}
                            </div>
                        </div>
                        <div className="select-work__selected_form select-work__selected_form--hidden" >
                            <div className="select-work__item">
                                <div className="select-work__input_name">Название</div>
                                <div className="select-work__input_field">
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
                            <div className="select-work__item">
                                <div className="select-work__input_name">Артикул</div>
                                <div className="select-work__input_field">
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
                        </div>
                        {!props.readOnly &&
                            <img index={index} onClick={deletePart} className="select-work__img" src={deleteSVG} />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectWork;