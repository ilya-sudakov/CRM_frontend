import React from 'react';
import './AdminWorkspace.scss';
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
        </div>
    );
};

export default AdminWorkspace;