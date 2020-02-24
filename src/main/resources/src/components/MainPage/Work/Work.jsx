import React, { useEffect, useState } from 'react';
import './Work.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { deleteWork, getWork } from '../../../utils/RequestsAPI/WorkManaging/WorkList.jsx';

const Work = (props) => {
    const [work, setWork] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Работы";
        loadWork();
    }, [])

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteWork(id)
            .then(() => loadWork())
    }

    const loadWork = () => {
        getWork()
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setWork(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="work">
            <div className="work__title">Работы</div>
            <SearchBar
                title="Поиск работы"
                placeholder="Введите название работы для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="work__amount_table">Всего: {work.length} записей</div>
            <TableView
                data={work}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
            />
        </div>
    );
};

export default Work;