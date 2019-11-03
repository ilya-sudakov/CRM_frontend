import React, { useState, useEffect } from 'react';
import './Contracts.scss';

const Contracts = (props) => {
    const [contracts, setContracts] = useState([
        {
            id: 1,
            number: '10.11.19',
            date: new Date().getTime(),
            template: 'договор',
            client: 'Петя Сидоров',
            price: 1500,
            daysLeft: '50',
            deadline: '10.10.2020',
            delivery: true,
            status: 'Согласование макета',
            requestNumber: '51241',
        },
        {
            id: 2,
            number: '10.11.19',
            date: new Date().getTime(),
            template: 'договор',
            client: 'Петя Сидоров',
            price: 15700,
            daysLeft: '50',
            deadline: '10.10.2020',
            delivery: true,
            status: 'Согласование макета',
            requestNumber: '51241',
        },
        {
            id: 3,
            number: '10.11.19',
            date: new Date().getTime(),
            template: 'договор',
            client: 'Петя Сидоров',
            price: 39000,
            daysLeft: '50',
            deadline: '10.10.2020',
            delivery: true,
            status: 'Согласование макета',
            requestNumber: '51241',
        },
    ])

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        const newContracts = contracts.filter( el => el.id != id);
        setContracts(newContracts);
    }

    useEffect(() => {
        document.title = "Договоры";
    })

    return (
        <div className="contracts">
            <div className="contracts__title">Договоры</div>
            <table className="contracts__table">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>№</td>
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
                        <tr key={id + 1}>
                            <td>{item.id}</td>
                            <td>{item.number}</td>
                            <td>{item.date}</td>
                            <td>{item.template}</td>
                            <td>{item.client}</td>
                            <td>{item.price}</td>
                            <td>{item.daysLeft}</td>
                            <td>{item.deadline}</td>
                            <td>{item.delivery ? 'Да' : 'Нет'}</td>
                            <td>{item.status}</td>
                            <td>{item.requestNumber}</td>
                            <td>
                                <div data-id={item.id} className="contracts__action" >Просмотр</div>
                                <div data-id={item.id} className="contracts__action" >Редактировать</div>
                                <div data-id={item.id} className="contracts__action" onClick={deleteItem}>Удалить</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Contracts;