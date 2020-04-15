import React, { useState, useEffect } from 'react';
import './Contracts.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import { getDocuments, deleteDocument } from '../../../utils/RequestsAPI/Documents.jsx';

const Contracts = (props) => {
    const [contracts, setContracts] = useState([])

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteDocument(id)
            .then(() => getDocuments())
            .then(res => res.json())
            .then((documents) => {
                setContracts(documents)
            })
    }

    useEffect(() => {
        document.title = "Договоры";
        getDocuments()
            .then(res => res.json())
            .then((documents) => {
                setContracts(documents);
            })
    }, [])

    return (
        <div className="contracts">
            <div className="main-window">
                <div className="main-window__title">Договоры</div>
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {contracts.length} записей</div>
                </div>
                <table className="main-window__table">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Дата</td>
                            <td>Шаблон</td>
                            <td>Клиент</td>
                            <td>Цена</td>
                            <td>Осталось</td>
                            <td>Дедлайн</td>
                            <td>Доставка</td>
                            <td>Статус</td>
                            <td>Заявка</td>
                            <td>Действия</td>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map((item, id) => (
                            <tr key={id + 1} className={id % 2 === 0 ? 'main-window__table--even' : 'main-window__table--odd'}>
                                <td>{item.id}</td>
                                <td>{item.date}</td>
                                <td>{item.template}</td>
                                <td>{item.client}</td>
                                <td>{item.price}</td>
                                <td>{item.daysLeft + ' кал. дней'}</td>
                                <td>{item.deadline}</td>
                                <td>{item.delivery ? 'Да' : 'Нет'}</td>
                                <td>{item.status ? item.status : '...'}</td>
                                <td>{item.request ? item.request : '...'}</td>
                                <td>
                                    <div data-id={item.id} className="main-window__action" >Просмотр</div>
                                    <div data-id={item.id} className="main-window__action" >Редактировать</div>
                                    <div data-id={item.id} className="main-window__action" onClick={deleteItem}>Удалить</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Contracts;