import React, { useEffect } from 'react';
import './SelectWorkHours.scss';
import { formatDateString } from '../../../../../utils/functions.jsx';

const SelectWorkHours = (props) => {

    useEffect(() => {

    }, [props.workArray])

    return (
        <div className="select-work-hours">
            <div className="select-work-hours__timeline">
                <div className="select-work-hours__wrapper">
                    <div className="select-work-hours__info">{formatDateString(props.date)}</div>
                    <div className="select-work-hours__info select-work-hours__info--inverted">Всего часов: {props.workArray.reduce((sum, cur) => sum + Number.parseInt(cur.hours), 0)}</div>
                </div>
                <div className="select-work-hours__line"></div>
            </div>
            <div className="select-work-hours__list">
                {props.workArray.map((item, index) => {
                    {/* console.log(item); */ }
                    return <div className="select-work-hours__list-item">
                        <div className="select-work-hours__circle"></div>
                        <span className="select-work-hours__work-name">{item.workName}</span>
                        <ul className="select-work-hours__products">
                            {item.product.map(product => {
                                {/* console.log(product); */ }
                                return <li>
                                    <span>{product.name}</span>
                                    <div>({product.quantity} шт.)</div>
                                </li>
                            })}
                        </ul>
                        <div className="select-work-hours__input">
                            <span>Часы* </span>
                            <input
                                type="number"
                                placeholder="Введите часы..."
                                value={item.hours}
                                onChange={(event) => {
                                    let value;
                                    if (event.target.value > 12) {
                                        value = 12;
                                    }
                                    else {
                                        if (event.target.value === '') {
                                            value = 0;
                                        }
                                        else {
                                            value = Number.parseInt(event.target.value);
                                        }
                                    }
                                    // console.log(value);
                                    let temp = props.workArray;
                                    temp.splice(index, 1, {
                                        ...item,
                                        hours: value
                                    });
                                    // console.log(temp);
                                    props.onChange([...temp]);
                                }}
                            />
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default SelectWorkHours;