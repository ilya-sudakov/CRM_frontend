import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../../../assets/select/delete.svg';
import './SelectParts.scss';

const SelectParts = (props) => {
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);

    const handleInputChange = (event) => {
        // setSearchQuery(event.target.value);
    }

    const clickOnInput = () => {
        const options = document.getElementsByClassName("select_parts__options")[0];
        const overlay = document.getElementsByClassName("select_parts__overlay")[0];
        if (options.classList.contains("select_parts__options--hidden")) {
            options.classList.remove("select_parts__options--hidden");
            overlay.classList.remove("select_parts__overlay--hidden");
        }
        else {
            options.classList.add("select_parts__options--hidden");
            overlay.classList.add("select_parts__overlay--hidden");
        }
    }

    const clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("select_parts__overlay")[0];
        if (!overlay.classList.contains("select_parts__overlay--hidden")) {
            overlay.classList.add("select_parts__overlay--hidden");
            clickOnInput();
        }
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

    useEffect(() => {
        if (props.defaultValue !== undefined) {
            setSelected([...props.defaultValue])
        }
        if (props.options !== undefined) {
            setOptions([...props.options])
        }
    }, [props.defaultValue, props.options])

    const handleNewPart = (e) => {
        e.preventDefault();
        setSelected([
            ...selected,
            {
                id: 1,
                number: 'ТАМН.043.004',
                name: 'Кляймер Злой',
                amount: '3',
                location: 'Выполнено. Лиговка',
                comment: '22.05-23.12.3',
                cuttingDimensions: 'Айгуль 14.95',
                milling: 'Айгуль 14.95',
                harding: 'Айгуль 14.95',
                grinding: 'Айгуль 14.95',
                erosion: 'Айгуль 14.95',
                check: 'Айгуль 14.95'
            }
        ])
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
                    <div className="select_parts__selected_item">
                        <div className="select_parts__selected_name">
                            {item.name}
                        </div>
                        <div className="select_parts__selected_name">
                            {item.number}
                        </div>
                        <div className="select_parts__selected_name">
                            {item.comment}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectParts;