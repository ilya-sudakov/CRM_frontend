import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../../assets/select/delete.svg';
import './SelectWorkHistory.scss';

const SelectWorkHistory = (props) => {
    const [selected, setSelected] = useState([
        {
            name: '',
            lastName: '',
            email: '',
            position: '',
            phoneNumber: ''
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (props.defaultValue !== undefined && props.defaultValue.length !== 0) {
            setSelected([...props.defaultValue]);
        }

    }, [props.defaultValue, props.options])

    const handleNewWorkHistory = (e) => {
        e.preventDefault();
        setSelected([
            ...selected,
            {
                name: '',
                lastName: '',
                email: '',
                position: '',
                phoneNumber: ''
            }
        ]);
        props.handleWorkHistoryChange([
            ...selected,
            {
                name: '',
                lastName: '',
                email: '',
                position: '',
                phoneNumber: ''
            }
        ]);
    }

    const deleteItem = (e) => {
        const id = e.target.getAttribute("index");
        let temp = selected;
        temp.splice(id, 1);
        setSelected([...temp]);
        props.handleWorkHistoryChange([...temp]);
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
        props.handleWorkHistoryChange([...temp])
    }

    return (
        <div className="select-work-history">
            {!props.readOnly &&
                <button className="select-work-history__button" onClick={handleNewWorkHistory}>
                    Добавить запись в историю
                </button>
            }
        </div>
    )
}

export default SelectWorkHistory;