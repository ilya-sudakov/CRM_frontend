import React, { useEffect, useState } from 'react';
import deleteSVG from '../../../../../../../assets/select/delete.svg';
import './SelectItems.scss';

const SelectItems = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        props.defaultValue && setItems([...props.defaultValue]);
        // console.log(props.defaultValue);
    }, [props.defaultValue]);

    const handleInputChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let index = event.target.dataset.id;
        let temp = items;
        temp.splice(index, 1, {
            ...temp[index],
            [name]: value
        });
        setItems([...temp]);
        props.onChange([...temp]);
    }

    const deleteItem = (event) => {
        let index = event.target.dataset.id;
        let temp = items;
        temp.splice(index, 1);
        setItems([...temp]);
        props.onChange([...temp]);
    }

    return (
        <div className="select-items">
            <div className="select-items__input">
                <div className="select-items__input_name">{props.inputName + (props.required ? '*' : '')}</div>
                <div className="select-items__input-field">
                    {!props.readOnly && <button onClick={(event) => {
                        event.preventDefault();
                        let temp = items;
                        temp.push({
                            name: '',
                            quantity: ''
                        });
                        setItems([...temp]);
                        props.onChange([...temp]);
                    }} className="select-items__button">Добавить элемент</button>}
                    <div className="select-items__list">
                        {props.error === true && <div className="select-items__error" onClick={
                            props.setErrorsArr ? (() => props.setErrorsArr({
                                ...props.errorsArr,
                                [props.name]: false
                            })) : null
                        }>Поле не заполнено!</div>}
                        {items.map((item, index) => {
                            return <div className="select-items__list-item">
                                <div>
                                    <span>Название</span>
                                    <input
                                        readOnly={props.readOnly}
                                        type="text"
                                        name="name"
                                        data-id={index}
                                        onChange={handleInputChange}
                                        value={item.name}
                                        placeholder="Введите название..."
                                        autoComplete="off"
                                    />
                                </div>
                                <div>
                                    <span>Кол-во</span>
                                    <input
                                        readOnly={props.readOnly}
                                        type="number"
                                        name="quantity"
                                        data-id={index}
                                        onChange={handleInputChange}
                                        value={item.quantity}
                                        placeholder="Введите кол-во..."
                                        autoComplete="off"
                                    />
                                </div>
                                {!props.readOnly && <img src={deleteSVG} className="select-items__img" onClick={deleteItem} data-id={index} title="Удалить элемент" />}
                                {/* {items.length > 1 && <img src={deleteSVG} className="select-items__img" onClick={deleteItem} data-id={index} title="Удалить элемент" />} */}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectItems;