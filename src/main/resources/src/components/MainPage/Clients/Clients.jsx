import React from 'react';

const clients = [
    {
        id: 1,
        name: 'ООО компания',
        contant: '982734982374',
        address: 'sdfdf',
        dossier: '',
        status: 'Клиент',
        simplified: true
    },
    {
        id: 2,
        name: 'ООО компания',
        contant: '982734982374',
        address: 'sdfdf',
        dossier: '',
        status: 'Клиент',
        simplified: true
    },
    {
        id: 3,
        name: 'ООО компания',
        contant: '982734982374',
        address: 'sdfdf',
        dossier: '',
        status: 'Клиент',
        simplified: true
    },
]

const Clients = () => {
    return(
        <div className="clients">
            <table className="clients__table" border="1">
                <tr>
                    <th>#</th>
                    <th>Клиент</th>
                    <th>Контакт</th>
                    <th>Адрес</th>
                    <th>Досье</th>
                    <th>Статус</th>
                    <th>Упрощенка</th>
                    <th>Действия</th>
                </tr>
                {clients.map((item, id) => (
                    <tr key={id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.contant}</td>
                        <td>{item.address}</td>
                        <td>{item.dossier}</td>
                        <td>{item.status}</td>
                        <td>{item.simplified}</td>
                        <td>Действие</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Clients;