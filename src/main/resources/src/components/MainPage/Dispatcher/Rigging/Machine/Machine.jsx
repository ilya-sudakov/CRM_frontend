import React, { useState, useEffect } from 'react';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import './Machine.scss';
import TableView from '../TableView/TableView.jsx';
import { getMachine, getMachineById, deletePartsFromMachine, deleteMachine } from '../../../../../utils/utilsAPI.jsx';

const Machine = (props) => {
    const [machines, setMachines] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Станки";
        loadMachines();
    }, [])

    const loadMachines = () => {
        getMachine()
            .then(res => res.json())
            .then(res => {
                // console.log(res);                
                setMachines(res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        getMachineById(id)
            .then(res => res.json())
            .then(res => {
                const parts = res.benchParts.map((item) => {
                    return deletePartsFromMachine(item.id);
                })
                Promise.all(parts)
                    .then(() => {
                        deleteMachine(id)
                            .then(() => loadMachines())
                    })
            })
    }

    return (
        <div className="machine">
            <SearchBar
                title='Поиск станка'
                setSearchQuery={setSearchQuery}
                placeholder='Введите здесь запрос для поиска...'
            />
            <div className="machine__amount_table">Всего: {machines.length} записей</div>
            <TableView
                data={machines}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
            />
        </div>
    )
}

export default Machine;