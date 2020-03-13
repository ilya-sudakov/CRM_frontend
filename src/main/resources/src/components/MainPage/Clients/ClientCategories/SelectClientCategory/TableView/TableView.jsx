import React, { useState, useEffect } from 'react';
import './TableView.scss';
import '../../../../../../utils/MainWindow/MainWindow.scss';
import TableDataLoading from '../../../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';

const TableView = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        props.data.length > 0 && setIsLoading(false);
        props.setShowWindow && props.setShowWindow(false);
    }, [props.closeWindow, props.data])

    return (
        <div className="client-categories__list">
            <div className="main-window">
                <div className="main-window__list">
                    <div className="main-window__list-item main-window__list-item--header">
                        <span>Название</span>
                        <span>Видимость</span>
                        <div className="main-window__actions">Действия</div>
                    </div>
                    {isLoading && <TableDataLoading
                        className="main-window__list-item"
                        minHeight="20px"
                    />}
                    {props.data.filter(item => {
                        return (item.name.toLowerCase().includes(props.searchQuery.toLowerCase()))
                    }).sort((a, b) => {
                        if (a.name.localeCompare(b.name, undefined, { numeric: true }) < 0) {
                            return -1;
                        }
                        if (a.name.localeCompare(b.name, undefined, { numeric: true }) > 0) {
                            return 1;
                        }
                        return 0;
                    }).map((item) => {
                        return <div className="main-window__list-item">
                            <span><div className="main-window__mobile-text">Название: </div>{item.name}</span>
                            <span><div className="main-window__mobile-text">Видимость: </div>{item.visibility}</span>
                            <div className="main-window__actions">
                                <div className="main-window__action" onClick={() => {
                                    // setEditCategory(item);
                                    // setCurForm('edit');
                                    // setShowWindow(!showWindow); 
                                    props.selectCategory(item.id, item.name);
                                    props.setCloseWindow(!props.closeWindow);
                                }}>
                                    Выбрать
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default TableView;