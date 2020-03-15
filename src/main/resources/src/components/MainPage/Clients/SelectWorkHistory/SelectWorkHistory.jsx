import React, { useState, useEffect } from 'react';
import '../../../../utils/MainWindow/MainWindow.scss';
import '../../../../utils/Form/Form.scss';
import deleteSVG from '../../../../../../../../assets/select/delete.svg';
// import okSVG from '../../../../../../../../assets/tableview/ok.svg';
import okSVG from '../../../../../../../../assets/tableview/calendar_check.svg';
import cancelSVG from '../../../../../../../../assets/tableview/cancel.svg';
import './SelectWorkHistory.scss';
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx';
import { formatDateString, formatDateStringWithTime } from '../../../../utils/functions.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const SelectWorkHistory = (props) => {
    const [items, setItems] = useState([]);
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
        setNewItem({
            date: new Date(),
            action: '',
            result: '',
            comment: ''
        });
    }, [props.defaultValue, props.options])

    const deleteItem = (e) => {
        const id = e.currentTarget.getAttribute("index");
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
                    setCreatingItem(true);
                    return setNewItem({
                        date: new Date(),
                        action: '',
                        result: '',
                        comment: ''
                    })
                }}>
                    Добавить запись в историю
                </button>
            }
            <div className="main-window">
                <div className="main-window__list">
                    {items.length > 0 && <div className="main-window__list-item main-window__list-item--header">
                        <span>Дата</span>
                        <span>Действие</span>
                        <span>Результат</span>
                        <span>Комментарий</span>
                        <div className="main-window__actions">Действие</div>
                    </div>}
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
                                value={newItem.action}
                                onChange={handleInputChange}
                            />
                        </span>
                        <span className="main-form__input_field">
                            <input
                                type="text"
                                name="result"
                                value={newItem.result}
                                onChange={handleInputChange}
                            />
                        </span>
                        <span className="main-form__input_field">
                            <input
                                type="text"
                                name="comment"
                                value={newItem.comment}
                                onChange={handleInputChange}
                            />
                        </span>
                        <div className="main-window__actions">
                            {isLoading
                                ? <ImgLoader />
                                : <React.Fragment>
                                    <div className="main-window__action" onClick={() => {
                                        setIsLoading(true);
                                        setItems([
                                            ...items,
                                            newItem
                                        ]);
                                        props.handleWorkHistoryChange([
                                            ...items,
                                            newItem
                                        ]);
                                        setIsLoading(false);
                                        setCreatingItem(false);
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
                        if (new Date(a.date) < new Date(b.date)) {
                            return 1;
                        }
                        if (new Date(a.date) > new Date(b.date)) {
                            return -1;
                        }
                        return 0;
                    }).map((item, index) => {
                        return <div className="main-window__list-item">
                            <span><div className="main-window__mobile-text">Дата: </div>{formatDateStringWithTime(item.date)}</span>
                            <span><div className="main-window__mobile-text">Действие: </div>{item.action}</span>
                            <span><div className="main-window__mobile-text">Результат: </div>{item.result}</span>
                            <span><div className="main-window__mobile-text">Комментарий: </div>{item.comment}</span>
                            <div className="main-window__actions">
                                {!props.readOnly && props.userHasAccess(['ROLE_ADMIN']) && item.comment !== '<Cообщение сгенерировано автоматически>' && <div className="main-window__action" index={index} onClick={deleteItem}>
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