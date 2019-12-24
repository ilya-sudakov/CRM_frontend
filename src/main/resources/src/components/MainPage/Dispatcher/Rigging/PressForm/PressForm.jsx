import React, { useState, useEffect } from 'react';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import './PressForm.scss';
import TableView from '../TableView/TableView.jsx';

const PressForm = (props) => {
    const [pressForm, setPressForms] = useState([
        {
            id: 1,
            number: 'ТАМН.043.004',
            name: 'Кляймер Злой',
            comment: '22.05-23.12.3',
            parts: [
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
                    check: 'Айгуль 14.95',
                },
                {
                    id: 2,
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
                    check: 'Айгуль 14.95',
                },
                {
                    id: 3,
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
                    check: 'Айгуль 14.95',
                },
            ]
        },
        {
            id: 2,
            number: 'ТАМН.03.004',
            name: 'Кляймер Зл4ой',
            comment: '22.05-23.12.3',
            parts: [
                {
                    id: 1,
                    number: 'ТАМН.043.004',
                    name: 'Кляймер Злой',
                    amount: '3',
                    location: 'Выполнено. Лиговка',
                    comment: '22.05-23.12.3',
                    cuttingDimensions: 'Георгий 14.95',
                    milling: 'Георгий 14.95',
                    harding: 'Георгий 14.95',
                    grinding: 'Георгий 14.95',
                    erosion: 'Георгий 14.95',
                    check: 'Георгий 14.95',
                },
                {
                    id: 3,
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
                    check: 'Айгуль 14.95',
                },
            ]
        },
        {
            id: 5,
            number: 'ТАМН.03.004',
            name: 'Кляймер Зл4ой',
            comment: '22.05-23.12.3',
            parts: [
                {
                    id: 1,
                    number: 'ТАМН.043.004',
                    name: 'Кляймер Злой',
                    amount: '3',
                    location: 'Выполнено. Лиговка',
                    comment: '22.05-23.12.3',
                    cuttingDimensions: 'Георгий 14.95',
                    milling: 'Георгий 14.95',
                    harding: 'Георгий 14.95',
                    grinding: 'Георгий 14.95',
                    erosion: 'Георгий 14.95',
                    check: 'Георгий 14.95',
                },
                {
                    id: 3,
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
                    check: 'Айгуль 14.95',
                },
                {
                    id: 3,
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
                    check: 'Айгуль 14.95',
                },
                {
                    id: 3,
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
                    check: 'Айгуль 14.95',
                },
                {
                    id: 3,
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
                    check: 'Айгуль 14.95',
                },
            ]
        }
    ])
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Штампы";
        // loadpressForm();
    }, [])

    const loadpressForm = () => {
        setPressForms()
    }

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        // deleteStamp(id)
        // .then(() => loadpressForm())
    }

    return (
        <div className="press_form">
            <SearchBar
                title='Поиск штампа'
                setSearchQuery={setSearchQuery}
                placeholder='Введите () для поиска...'
            />
            <div className="press_form__amount_table">Всего: {pressForm.length} записей</div>
            <TableView
                data={pressForm}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
            />
        </div>
    )
}

export default PressForm;