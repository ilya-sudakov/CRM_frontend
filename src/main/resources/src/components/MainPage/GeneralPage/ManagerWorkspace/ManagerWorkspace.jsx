import React, { useState } from 'react';
import '../../../../utils/MainWindow/MainWindow.scss'
import './ManagerWorkspace.scss';
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx';
import RecordAction from './RecordAction/RecordAction.jsx';

const ManagerWorkspace = (props) => {
    const [showWindow, setShowWindow] = useState(false);
    const [closeWindow, setCloseWindow] = useState(false);
    return (
        <div className="manager-workspace">
            <div className="main-window__button" onClick={(event) => {
                event.preventDefault();
                setShowWindow(!showWindow);
            }}>
                Совершить действие
            </div>
            <FormWindow
                title="Учет действия менеджера"
                content={
                    <React.Fragment>
                        <RecordAction
                            showWindow={showWindow}
                            setShowWindow={setShowWindow}
                            setCloseWindow={setCloseWindow}
                            closeWindow={closeWindow}
                        />
                    </React.Fragment>
                }
                showWindow={showWindow}
                setShowWindow={setShowWindow}
            />
        </div>
    );
};

export default ManagerWorkspace;