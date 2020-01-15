import React, { useState, useEffect } from 'react';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import './PressForm.scss';
import TableView from '../TableView/TableView.jsx';
import { getPressForm, getPressFormById, deletePartsFromPressForm, deletePressForm } from '../../../../../utils/RequestsAPI/Rigging/PressForm.jsx';

const PressForm = (props) => {
    const [pressForm, setPressForms] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Пресс-формы";
        loadPressForm();
    }, [])

    const loadPressForm = () => {
        getPressForm()
            .then(res => res.json())
            .then(res => {
                // console.log(res);                
                setPressForms(res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        getPressFormById(id)
            .then(res => res.json())
            .then(res => {
                const parts = res.pressParts.map((item) => {
                    return deletePartsFromPressForm(item.id);
                })
                Promise.all(parts)
                    .then(() => {
                        deletePressForm(id)
                            .then(() => loadPressForm())
                    })
            })
    }

    return (
        <div className="press_form">
            <SearchBar
                title='Поиск пресс-формы'
                setSearchQuery={setSearchQuery}
                placeholder='Введите здесь запрос для поиска...'
            />
            <div className="press_form__amount_table">Всего: {pressForm.length} записей</div>
            <TableView
                data={pressForm}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
                loadData={loadPressForm}
            />
        </div>
    )
}

export default PressForm;