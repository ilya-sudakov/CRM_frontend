import React, { useState } from 'react';
import './SelectWorkNew.scss';
import '../../../../../utils/MainWindow/MainWindow.scss';

const SelectWorkNew = (props) => {
    const [showWindow, setShowWindow] = useState(false);
    const [closeWindow, setCloseWindow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className="select-work-new">
            <div className="main-window">
                <button className="main-window__button" onClick={(event) => {
                    event.preventDefault();
                }}>
                    Добавить работу
                </button>
            </div>
        </div>
    );
};

export default SelectWorkNew;

const SelectFromWorkList = (props) => {
    return (
        <div>
            sdfsdf
        </div>
    );
};

