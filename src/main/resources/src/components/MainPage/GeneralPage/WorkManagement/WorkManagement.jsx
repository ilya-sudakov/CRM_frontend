import React, { useEffect, useState } from 'react';
import './WorkManagement.scss';
import { Link } from 'react-router-dom';

const WorkManagement = (props) => {
    const [recordedWork, setRecordedWork] = useState([
        {
            id: 1, 
            responsible: 'Григорьев А. В.',
            time: 8.5,
        },
        {
            id: 2, 
            responsible: 'Константинов П. И.',
            time: 12,
        }
    ])
    return (
        <div className="work-management">
            <div className="work-management__title">{'Учет рабочего времени - Цех' + (props.userHasAccess(['ROLE_LEMZ']) ? 'ЛЭМЗ' : 'Лепсари') + ' (Тест)'}</div>
            <div className="work-management__content">
                {(recordedWork.length === 0) && <div className="work-management__info">Нет записей о проведенной работе за сегодня!</div>}
                <div className="work-management__list">
                    {recordedWork.map((item) => (
                        <Link className="work-management__item" to={'/work-managment/record-time/edit/' + item.id}>
                            <div>{item.responsible}</div>
                            <div>Время работы: {item.time} часов</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkManagement;