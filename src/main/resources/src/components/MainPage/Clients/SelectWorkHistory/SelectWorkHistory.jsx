import React, { useState, useEffect } from 'react';
import '../../../../utils/MainWindow/MainWindow.scss';
import '../../../../utils/Form/Form.scss';
import deleteSVG from '../../../../../../../../assets/select/delete.svg';
import okSVG from '../../../../../../../../assets/tableview/ok.svg';
import cancelSVG from '../../../../../../../../assets/tableview/cancel.svg';
import './SelectWorkHistory.scss';
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx';
import { formatDateString } from '../../../../utils/functions.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const SelectWorkHistory = (props) => {
    const [items, setItems] = useState([
        {
            date: '',
            action: '',
            result: '',
            comment: ''
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [creatingItem, setCreatingItem] = useState(false);
    const [newItem, setNewItem] = useState({
        date: new Date(),
        action: '',
        result: '',
        comment: ''
    })

    useEffect(() => {
        if (props.defaultValue !== undefined && props.defaultValue.length !== 0) {
            setItems([...props.defaultValue]);
        }
        setItems([
            {
                date: new Date(),
                action: 'Создание записи',
                result: 'Результат',
                comment: 'Комментарий'
            },
            {
                date: new Date(),
                action: 'Создание записи',
                result: 'Результат',
                comment: 'Комментарий'
            },
            {
                date: new Date(),
                action: 'Создание записи',
                result: 'Результат',
                comment: 'Комментарий'
            },
            {
                date: new Date(),
                action: 'Создание записи',
                result: 'Результат',
                comment: 'Комментарий'
            },
            {
                date: new Date(),
                action: 'Создание записи',
                result: 'Результат',
                comment: 'Комментарий'
            },
            {
                date: new Date(),
                action: 'Создание записи',
                result: 'Результат',
                comment: 'Комментарий'
            },
        ])
    }, [props.defaultValue, props.options])

    const handleNewWorkHistory = (e) => {
        e.preventDefault();
        setItems([
            ...items,
            {
                date: '',
                action: '',
                result: '',
                comment: ''
            }
        ]);
        props.handleWorkHistoryChange([
            ...items,
            {
                date: '',
                action: '',
                result: '',
                comment: ''
            }
        ]);
    }

    const deleteItem = (e) => {
        const id = e.target.getAttribute("index");
        let temp = items;
        temp.splice(id, 1);
        setItems([...temp]);
        props.handleWorkHistoryChange([...temp]);
    }

    const handleInputChange = (event) => {
        const name = event.target.getAttribute("name");
        let value = event.target.value;
        setNewItem({
            ...newItem,
            [name]: value
        })
    }

    return (
        <div className="select-work-history">
            {!props.readOnly &&
                <button className="select-work-history__button" onClick={(event) => {
                    event.preventDefault();
                    return setCreatingItem(true);
                }}>
                    Добавить запись в историю
                </button>
            }
            <div className="main-window">
                <div className="main-window__list">
                    <div className="main-window__list-item main-window__list-item--header">
                        <span>Дата</span>
                        <span>Действие</span>
                        <span>Результат</span>
                        <span>Комментарий</span>
                        <div className="main-window__actions">Действие</div>
                    </div>
                    <div className={creatingItem ? "main-window__list-item main-window__list-item--input" : "main-window__list-item main-window__list-item--input main-window__list-item--hidden"}>
                        <span className="main-form__input_field">
                            <InputDate
                                required
                                name="date"
                                selected={Date.parse(newItem.date)}
                                handleDateChange={(date) => {
                                    setNewItem({
                                        ...newItem,
                                        date: date
                                    })
                                }}
                            />
                        </span>
                        <span className="main-form__input_field">
                            <input
                                type="text"
                                name="action"
                                onChange={handleInputChange}
                            />
                        </span>
                        <span className="main-form__input_field">
                            <input
                                type="text"
                                name="result"
                                onChange={handleInputChange}
                            />
                        </span>
                        <span className="main-form__input_field">
                            <input
                                type="text"
                                name="comment"
                                onChange={handleInputChange}
                            />
                        </span>
                        <div className="main-window__actions">
                            {isLoading
                                ? <ImgLoader />
                                : <React.Fragment>
                                    <div className="main-window__action" onClick={() => {
                                        setItems([
                                            ...items,
                                            { ...newItem }]);
                                        props.handleWorkHistoryChange([
                                            ...items,
                                            { ...newItem }
                                        ]);
                                        setIsLoading(true);
                                        // setCreatingItem(false);
                                    }}>
                                        <img className="main-window__img" src={okSVG} />
                                    </div>
                                    <div className="main-window__action" onClick={() => {
                                        setCreatingItem(false);
                                    }}>
                                        <img className="main-window__img" src={cancelSVG} />
                                    </div>
                                </React.Fragment>}
                        </div>
                    </div>
                    {items.sort((a, b) => {
                        if (a.date < b.date) {
                            return 1;
                        }
                        if (a.date > b.date) {
                            return -1;
                        }
                        return 0;
                    }).map(item => {
                        return <div className="main-window__list-item">
                            <span>{formatDateString(item.date)}</span>
                            <span>{item.action}</span>
                            <span>{item.result}</span>
                            <span>{item.comment}</span>
                            <div className="main-window__actions">
                                {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" onClick={() => {

                                }}>
                                    <img className="main-window__img" src={deleteSVG} />
                                </div>}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default SelectWorkHistory;