import React from 'react';
import './AdminWorkspace.scss';
import XLSX from 'xlsx';
import { Notifications, WorkManagement } from '../../lazyImports.jsx';

const AdminWorkspace = (props) => {
    

    return (
        <div className="admin-workspace">
            <Notifications
                userHasAccess={props.userHasAccess}
            />
            <WorkManagement
                userHasAccess={props.userHasAccess}
            />
            {/* <button className="admin-workspace__button" onClick={exportCSVFile}>Скачать Табель</button> */}
        </div>
    );
};

export default AdminWorkspace;